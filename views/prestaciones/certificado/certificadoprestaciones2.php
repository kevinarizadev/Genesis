<?php 
	session_start();
	if (!isset($_SESSION['nombre'])) {
		header("Location: ../../../index.html");
	}
	?>
	<html ng-app = "GenesisApp">
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<title>Certificado - Prestaciones Economicas</title>
			<link rel="icon" href="../../../assets/images/icon.ico" />
			<script src="../../../bower_components/angular/angular.js"></script>
			<script src="../../../bower_components/jquery/dist/jquery.js"></script>
			<script src="../../../bower_components/angular-route/angular-route.js"></script>
			<script src="../../../scripts/controllers/prestacioneseconomicas/CertificadoController.js"></script>
		<script src="../../../scripts/services/util/communication.js"></script>
<body style="margin: 0;" ng-controller="CertificadoController"> 

<div id="p1" style="overflow: hidden; position: relative; background-color: white; width: 935px; height: 1210px;">

<!-- Begin shared CSS values -->
<style class="shared-css" type="text/css" >
.t {
	-webkit-transform-origin: bottom left;
	-ms-transform-origin: bottom left;
	transform-origin: bottom left;
	-webkit-transform: scale(0.25);
	-ms-transform: scale(0.25);
	transform: scale(0.25);
	z-index: 2;
	position: absolute;
	white-space: pre;
	overflow: visible;
}
</style>
<!-- End shared CSS values -->


<!-- Begin inline CSS -->
<style type="text/css" >

	#t1_1{left:132px;bottom:949px;letter-spacing:-0.3px;word-spacing:0.6px;}
	#t2_1{left:574px;bottom:949px;letter-spacing:-0.2px;word-spacing:0.4px;}
	#t3_1{left:158px;bottom:927px;letter-spacing:-0.2px;word-spacing:0.4px;}
	#t4_1{left:403px;bottom:905px;letter-spacing:-0.2px;word-spacing:0.5px;}
	#t5_1{left:528px;bottom:905px;letter-spacing:0.3px;}
	#t6_1{left:411px;bottom:824px;letter-spacing:-0.1px;}
	#t7_1{left:130px;bottom:786px;letter-spacing:-0.1px;word-spacing:-3.3px;}
	#t8_1{left:252px;bottom:786px;letter-spacing:-0.3px;word-spacing:-3.2px;}
	#t9_1{left:434px;bottom:786px;letter-spacing:-0.1px;word-spacing:-3.3px;}
	#ta_1{left:130px;bottom:767px;letter-spacing:-0.1px;}
	#tb_1{left:162px;bottom:767px;letter-spacing:-0.2px;word-spacing:0.4px;}
	#tc_1{left:278px;bottom:767px;letter-spacing:-0.1px;word-spacing:0.2px;}
	#td_1{left:80px;bottom:726px;letter-spacing:-0.1px;}
	#te_1{left:53px;bottom:712px;letter-spacing:-0.1px;}
	#tf_1{left:168px;bottom:726px;letter-spacing:-0.1px;word-spacing:0.4px;}
	#tg_1{left:158px;bottom:712px;letter-spacing:-0.1px;}
	#th_1{left:252px;bottom:726px;letter-spacing:-0.1px;word-spacing:0.1px;}
	#ti_1{left:262px;bottom:712px;letter-spacing:-0.1px;}
	#tj_1{left:329px;bottom:726px;letter-spacing:-0.1px;word-spacing:0.1px;}
	#tk_1{left:319px;bottom:712px;letter-spacing:-0.2px;}
	#tl_1{left:403px;bottom:719px;letter-spacing:-0.1px;}
	#tm_1{left:470px;bottom:733px;letter-spacing:-0.1px;}
	#tn_1{left:482px;bottom:719px;letter-spacing:-0.1px;}
	#to_1{left:488px;bottom:705px;letter-spacing:-0.1px;}
	#tp_1{left:588px;bottom:733px;letter-spacing:-0.1px;}
	#tq_1{left:562px;bottom:719px;letter-spacing:-0.1px;}
	#tr_1{left:568px;bottom:705px;letter-spacing:-0.1px;}
	#ts_1{left:667px;bottom:733px;letter-spacing:-0.4px;word-spacing:1.3px;}
	#tt_1{left:672px;bottom:719px;letter-spacing:-0.1px;}
	#tu_1{left:671px;bottom:705px;letter-spacing:-0.1px;}
	#tv_1{left:773px;bottom:726px;letter-spacing:-0.1px;}
	#tw_1{left:759px;bottom:712px;letter-spacing:-0.2px;}
	#tx_1{left:833px;bottom:726px;letter-spacing:-0.1px;word-spacing:0.1px;}
	#ty_1{left:844px;bottom:712px;letter-spacing:-0.1px;}
	#tz_1{left:54px;bottom:685px;letter-spacing:0.2px;}
	#t10_1{left:152px;bottom:692px;letter-spacing:0.1px;}
	#t11_1{left:164px;bottom:679px;letter-spacing:0.2px;}
	#t12_1{left:251px;bottom:685px;letter-spacing:0.1px;}
	#t13_1{left:329px;bottom:685px;letter-spacing:0.1px;}
	#t14_1{left:423px;bottom:685px;letter-spacing:0.2px;}
	#t15_1{left:495px;bottom:685px;letter-spacing:0.2px;}
	#t16_1{left:569px;bottom:685px;letter-spacing:0.1px;}
	#t17_1{left:656px;bottom:692px;letter-spacing:0.1px;word-spacing:-0.1px;}
	#t18_1{left:655px;bottom:679px;letter-spacing:0.2px;word-spacing:-0.2px;}
	#t19_1{left:765px;bottom:685px;letter-spacing:0.2px;word-spacing:-0.2px;}
	#t1a_1{left:833px;bottom:685px;letter-spacing:0.1px;}
	#t1b_1{left:130px;bottom:620px;letter-spacing:-0.2px;word-spacing:0.4px;}
	#t1c_1{left:130px;bottom:543px;letter-spacing:-0.1px;}
	#t1d_1{left:130px;bottom:524px;letter-spacing:-0.1px;word-spacing:0.1px;}

	.s1_1{
		FONT-SIZE: 67.5px;
		FONT-FAMILY: arial;
		color: rgb(0,0,0);
	}

	.s1_1_1{
		FONT-SIZE: 67.5px;
		/* FONT-FAMILY: Arial-BoldMT_9; */
		color: rgb(0,0,0);
	}			

	.s2_1{
		FONT-SIZE: 67.5px;
		FONT-FAMILY: arial;
		color: rgb(0,0,0);
	}

	.s3_1{
		FONT-SIZE: 85.8px;
		FONT-FAMILY: ArialMT_c;
		color: rgb(0,0,0);
	}

	.s4_1{
		FONT-SIZE: 49.1px;
		FONT-FAMILY: Arial-BoldMT_9;
		color: rgb(0,0,0);
	}

	.s5_1{
		FONT-SIZE: 42.5px;
		FONT-FAMILY: ArialMT_c;
		color: rgb(0,0,0);
	}
	
</style>



<style id="fonts1" type="text/css" >

	@font-face {
		font-family: Arial-BoldMT_9;
		src: url("fonts/Arial-BoldMT_9.woff") format("woff");
	}

	@font-face {
		font-family: ArialMT_c;
		src: url("fonts/ArialMT_c.woff") format("woff");
	}

</style>
<!-- End embedded font definitions -->

<!-- Begin page background -->
<div id="pg1Overlay" style="width:100%; height:100%; position:absolute; z-index:1; background-color:rgba(0,0,0,0); -webkit-user-select: none;"></div>
<div id="pg1" style="-webkit-user-select: none;">
<object width="935" height="1210" data="fonts/1.svg" type="image/svg+xml" id="pdf1" style="width:935px; height:1210px; -moz-transform:scale(1); z-index: 0;"></object>
</div>
<!-- End page background -->


<!-- Begin text definitions (Positioned/styled in CSS) -->
<div id="t1_1" class="t s1_1"> <strong>CAJA DE COMPENSACIÓN FAMILIAR DEL ATLÁNTICO</strong></div>
<div id="t2_1" class="t s2_1">, en desarrollo de su programa </div>
<div id="t3_1" class="t s2_1">especial para la garantía y prestación del Plan de Beneficios en Salud denominado </div>
<div id="t4_1" class="t s1_1"> <strong>CAJACOPI EPS</strong></div>
<div id="t5_1" class="t s2_1">. </div>

<div>		
		<div id="t6_1" class="t s3_1">CERTIFICA </div>
			<div style="position: absolute;left: 130px;top: 396px;width: 2653.58px;height: auto;">
			<p id="t7_1" class="t s2_1" style="position: absolute;width: 100%;height: auto;word-break: break-word;margin: 0;white-space: pre-wrap;text-align: justify;top: 0;left: 0;">{{empresa}} <strong>{{nombreempresa}}</strong> , identificado(a) en nuestro sistema de información  con <strong> {{nit}}</strong> , presenta las siguientes prestaciones económicas{{punto}} {{rango}} </p>
			</div>

		<div style="margin-top: 4em;position: absolute;top: 396px;height: auto;">
				<style> table.example-table, .example-table td ,th{ border: 1px solid black; border-collapse: collapse; } </style> 
				<br>
				<table  class="example-table">
				<tr style="font-size:13px;text-align: center; FONT-FAMILY: arial;">
				<th >No Incapacidad</th>
				<th>Tipo de Prestación</th>
				<th>Fecha de Inicio</th>
				<th>Fecha de Terminación</th>
				<th>Duración</th>
				<th>Diagnostico (Código CE10)</th>
				<th>No Documento Cotizante</th>
				<th>Nombres y apellidos Cotizante</th>
				<th>Valor Liquidado</th>
				<th>Fecha de Pago</th>
				</tr>
				<tr style="font-size:13px;text-align: center;font-family: arial;" ng-repeat="x in res ">
				<td>{{x.CONCEPTO}}</td>
				<td>{{x.CONCEPTO_NOMBRE}}</td>
				<td>{{x.PREF_FECHA}}</td>
				<td>{{x.PREF_FINAL}}</td>
				<td>{{x.DIAS_OTROGADOS}}</td>
				<td>{{x.DIAG_NOMBRE}}</td>
				<td>{{x.PREC_AFILIADO_DOC}}</td>
				<td>{{x.NOMBRE_AFILIADO}}</td>
				<td>{{x.VALOR}}</td>									
				<td>{{x.FECHA_PAGO}}</td>		
				</tr>
				</table>
		</div>
		<?php $mes = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");?>
<div style="position: absolute;left: 0;top: 396px;width: 2653.58px;height: auto;">
	<p id="t7_1" class="t s2_1 ng-binding" style="position: absolute;width: 100%;height: auto;word-break: break-word;margin: 0;white-space: pre-wrap;text-align: left;top: 190px;left: 0;bottom: auto;">Nota: En caso de dudas o inquietudes, favor comunicarse al teléfono (5)318 5930 Ext.310  <br>o a los correos electrónicos presteconomicas1@cajacopieps.com - presteconomicas2@cajacopieps.com</p>
</div>
<div id="t1b_1" class="t s2_1" style="left: 0;bottom: 353px;letter-spacing: -0.2px;word-spacing: 0.4px;">Se expide a los (<?php $hoy = date("d");echo $hoy;?>) días del mes de <?php echo $mes[date('n')-1]; ?> de <?php $hoy = date("Y");echo $hoy;?>. </div>	
<div>
</div>		
<div id="t1c_1" class="t s2_1" style="left: 0;bottom: 240px;letter-spacing: -0.1px;">____________________________________________________</div>
<div id="t1d_1" class="t s1_1" style="left: 0;bottom: 209px;letter-spacing: -0.1px;word-spacing: 0.1px;"><strong>SUBDIRECCION NACIONAL DE REGIMEN CONTRIBUTIVO</strong></div>
<div id="t1d_1" class="t s1_1" style="left: 0;bottom: 191px;letter-spacing: -0.1px;word-spacing: 0.1px;font-size: 60px;">Aprobó: Luis Hely Castellanos Rodriguez – Coordinador Nacional de Administración de Base de Datos></div>
<div id="t1d_1" class="t s1_1" style="left: 0;bottom: 175px;letter-spacing: -0.1px;word-spacing: 0.1px;font-size: 55px;">Generó:  <?php echo $_SESSION['usu'] ?></div>
<div id="t1d_1" class="t s1_1" style="left: 0;bottom: 161px;letter-spacing: -0.1px;word-spacing: 0.1px;font-size: 55px;">Fecha y Hora: <?php $hoy = date("d/m/Y  g:i a");echo $hoy;?></div>
</div>
</div>
</body>
</html>
