<?php
session_start();
if (!isset($_SESSION['nombre'])) {
	header("Location: ../../../index.html");
}
?>
<html>

<html ng-app="GenesisApp">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Certificado - Prestaciones Economicas</title>
<link rel="icon" href="../../../assets/images/icon.ico" />
<script src="../../../bower_components/angular/angular.js"></script>
<script src="../../../bower_components/jquery/dist/jquery.js"></script>
<script src="../../../bower_components/angular-route/angular-route.js"></script>
<script src="../../../scripts/controllers/prestacioneseconomicas/CertificadoController.js"></script>
<script src="../../../scripts/services/util/communication.js"></script>

<style>
	/* Font Definitions */
	@font-face {
		font-family: Wingdings;
		panose-1: 5 0 0 0 0 0 0 0 0 0;
	}

	@font-face {
		font-family: "Cambria Math";
		panose-1: 2 4 5 3 5 4 6 3 2 4;
	}

	@font-face {
		font-family: Calibri;
		panose-1: 2 15 5 2 2 2 4 3 2 4;
	}

	@font-face {
		font-family: "Segoe UI";
		panose-1: 2 11 5 2 4 2 4 2 2 3;
	}

	@font-face {
		font-family: Tahoma;
		panose-1: 2 11 6 4 3 5 4 4 2 4;
	}

	/* Style Definitions */
	p.MsoNormal,
	li.MsoNormal,
	div.MsoNormal {
		margin-top: 0cm;
		margin-right: 0cm;
		margin-bottom: 8.0pt;
		margin-left: 0cm;
		line-height: 107%;
		font-size: 11.0pt;
		font-family: "Calibri", sans-serif;
	}

	p.MsoHeader,
	li.MsoHeader,
	div.MsoHeader {
		mso-style-link: "Encabezado Car";
		margin: 0cm;
		margin-bottom: .0001pt;
		font-size: 11.0pt;
		font-family: "Calibri", sans-serif;
	}

	p.MsoFooter,
	li.MsoFooter,
	div.MsoFooter {
		mso-style-link: "Pie de página Car";
		margin: 0cm;
		margin-bottom: .0001pt;
		font-size: 11.0pt;
		font-family: "Calibri", sans-serif;
	}

	a:link,
	span.MsoHyperlink {
		color: #0563C1;
		text-decoration: underline;
	}

	a:visited,
	span.MsoHyperlinkFollowed {
		color: #954F72;
		text-decoration: underline;
	}

	p.MsoAcetate,
	li.MsoAcetate,
	div.MsoAcetate {
		mso-style-link: "Texto de globo Car";
		margin: 0cm;
		margin-bottom: .0001pt;
		font-size: 9.0pt;
		font-family: "Segoe UI", sans-serif;
	}

	p.MsoNoSpacing,
	li.MsoNoSpacing,
	div.MsoNoSpacing {
		margin: 0cm;
		margin-bottom: .0001pt;
		font-size: 11.0pt;
		font-family: "Calibri", sans-serif;
	}

	p.MsoListParagraph,
	li.MsoListParagraph,
	div.MsoListParagraph {
		margin-top: 0cm;
		margin-right: 0cm;
		margin-bottom: 0cm;
		margin-left: 36.0pt;
		margin-bottom: .0001pt;
		font-size: 11.0pt;
		font-family: "Calibri", sans-serif;
	}

	span.EncabezadoCar {
		mso-style-name: "Encabezado Car";
		mso-style-link: Encabezado;
	}

	span.PiedepginaCar {
		mso-style-name: "Pie de página Car";
		mso-style-link: "Pie de página";
	}

	span.TextodegloboCar {
		mso-style-name: "Texto de globo Car";
		mso-style-link: "Texto de globo";
		font-family: "Segoe UI", sans-serif;
	}

	.MsoChpDefault {
		font-family: "Calibri", sans-serif;
	}

	.MsoPapDefault {
		margin-bottom: 8.0pt;
		line-height: 107%;
	}

	/* Page Definitions */
	@page WordSection1 {
		size: 612.0pt 792.0pt;
		margin: 0cm 87.5pt 70.85pt 3.0cm;
	}

	div.WordSection1 {
		page: WordSection1;
	}

	/* List Definitions */
	ol {
		margin-bottom: 0cm;
	}

	ul {
		margin-bottom: 0cm;
	}

	@media print {

		table,
		td,
		th,
		tr,
		span {
			font-size: 7.5px !important;
		}
	}
</style>

</head>

<body lang=ES-CO link="#0563C1" vlink="#954F72" ng-controller="CertificadoController">

	<div class=WordSection1 style="position: 	relative;	">
		<img src="https://genesis.cajacopieps.com//assets/images/cajacopi.png " width="100px;" style="padding: 	10px">


		<p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;
margin-left:-35.45pt;margin-bottom:.0001pt;text-align:justify;text-indent:35.45pt'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>

		<p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;
margin-left:-35.45pt;margin-bottom:.0001pt;text-align:justify;text-indent:35.45pt'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>
		<p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;
margin-left:-35.45pt;margin-bottom:.0001pt;text-align:justify;text-indent:35.45pt'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>


		<div style='font-size:9.0pt;font-family:"Arial";text-align: center;justify-content: center;'>
			<div> <strong>CAJA DE COMPENSACIÓN FAMILIAR DEL ATLÁNTICO</strong> en desarrollo de su programa </div>
			<div>especial para la garantía y prestación del Plan de Beneficios en Salud denominado </div>
			<div> <strong>CAJACOPI EPS</strong></div>
		</div>



		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><b><span style='font-size:7.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></b></p>
		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><b><span style='font-size:7.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></b></p>
		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><b><span style='font-size:7.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></b></p>
		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><b><span style='font-size:7.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></b></p>

		<div style='font-size:12.0pt;font-family:"Arial";text-align: center;justify-content: center;'>
			<div> <strong>CERTIFICA</strong></div>
		</div>

		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify'><span style='font-size:9.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>
		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify'><span style='font-size:9.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>

		<!-- position: absolute;width: 100%;height: auto;word-break: break-word;margin: 0;white-space: pre-wrap;text-align: justify;top: 0;left: 0;" -->
		<div style='font-size:9.0pt;font-family:"Arial";text-align: center;justify-content: center;display:flex'>
			<div style="text-align: justify;">
				{{empresa}} <strong>{{nombreempresa}}</strong> , identificado(a) en nuestro sistema de <br>
				información con <strong> {{nit}}</strong> presenta las siguientes prestaciones económicas{{punto}}<br>
				{{rango}}
			</div>
		</div>

		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>
		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>
		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>


		<div align=center>

			<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 style='background:white;border-collapse:collapse;border:none'>
				<tr style='height:1.0pt'>
					<td style='border:solid windowtext 1.0pt;background:#F2F2F2;padding:0cm 3.5pt 0cm 3.5pt;height:1.0pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><b>
								<span lang=ES style='font-size:8.0pt;font-family:"Arial",sans-serif'>No Incapacidad</span></b></p>
					</td>

					<td style='border:solid windowtext 1.0pt;border-left:none;background:#F2F2F2;padding:0cm 3.5pt 0cm 3.5pt;height:1.0pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><b>
								<span lang=ES style='font-size:8.0pt;font-family:"Arial",sans-serif'>Tipo de Prestación</span></b></p>
					</td>
					<td style='border:solid windowtext 1.0pt;border-left:none;background:#F2F2F2;padding:0cm 3.5pt 0cm 3.5pt;height:1.0pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><b>
								<span lang=ES style='font-size:8.0pt;font-family:"Arial",sans-serif'> Fecha de Inicio </span></b></p>
					</td>
					<td style='border:solid windowtext 1.0pt;border-left:none;background:#F2F2F2;padding:0cm 3.5pt 0cm 3.5pt;height:1.0pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><b>
								<span lang=ES style='font-size:8.0pt;font-family:"Arial",sans-serif'> Fecha de Terminación </span></b></p>
					</td>
					<td style='border:solid windowtext 1.0pt;border-left:none;background:#F2F2F2;padding:0cm 3.5pt 0cm 3.5pt;height:1.0pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><b>
								<span lang=ES style='font-size:8.0pt;font-family:"Arial",sans-serif'> Duración </span></b></p>
					</td>
					<td style='border:solid windowtext 1.0pt;border-left:none;background:#F2F2F2;padding:0cm 3.5pt 0cm 3.5pt;height:1.0pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><b>
								<span lang=ES style='font-size:8.0pt;font-family:"Arial",sans-serif'> Diagnostico (Código CE10) </span></b></p>
					</td>
					<td style='border:solid windowtext 1.0pt;border-left:none;background:#F2F2F2;padding:0cm 3.5pt 0cm 3.5pt;height:1.0pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><b>
								<span lang=ES style='font-size:8.0pt;font-family:"Arial",sans-serif'> No Documento Cotizante </span></b></p>
					</td>
					<td style='border:solid windowtext 1.0pt;border-left:none;background:#F2F2F2;padding:0cm 3.5pt 0cm 3.5pt;height:1.0pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><b>
								<span lang=ES style='font-size:8.0pt;font-family:"Arial",sans-serif'> Nombres y apellidos Cotizante </span></b></p>
					</td>
					<td style='border:solid windowtext 1.0pt;border-left:none;background:#F2F2F2;padding:0cm 3.5pt 0cm 3.5pt;height:1.0pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><b>
								<span lang=ES style='font-size:8.0pt;font-family:"Arial",sans-serif'> Valor Liquidado </span></b></p>
					</td>
					<td style='border:solid windowtext 1.0pt;border-left:none;background:#F2F2F2;padding:0cm 3.5pt 0cm 3.5pt;height:1.0pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'><b>
								<span lang=ES style='font-size:8.0pt;font-family:"Arial",sans-serif'> Fecha de Pago </span></b></p>
					</td>

				</tr>
				<tr style='height:10.4pt' ng-repeat="x in res ">
					<td style='width:98.35pt;border:solid windowtext 1.0pt;border-top:none;padding:0cm 3.5pt 0cm 3.5pt;height:10.4pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'>
							<span style='font-size:7.0pt;font-family:"Arial",sans-serif;color:#333333'>{{x.CONCEPTO}}</span></p>
					</td>
					<td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:10.4pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'>
							<span style='font-size:7.0pt;font-family:"Arial",sans-serif;color:#333333'>{{x.CONCEPTO_NOMBRE}}</span></p>
					</td>
					<td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:10.4pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'>
							<span style='font-size:7.0pt;font-family:"Arial",sans-serif;color:#333333'>{{x.PREF_FECHA}}</span></p>
					</td>
					<td style='width:84.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:10.4pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'>
							<span style='font-size:7.0pt;font-family:"Arial",sans-serif;color:#333333'>{{x.PREF_FINAL}}</span></p>
					</td>
					<td style='width:84.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:10.4pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'>
							<span style='font-size:7.0pt;font-family:"Arial",sans-serif;color:#333333'>{{x.DIAS_OTROGADOS}}</span></p>
					</td>
					<td style='width:84.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:10.4pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'>
							<span style='font-size:7.0pt;font-family:"Arial",sans-serif;color:#333333'>{{x.DIAG_NOMBRE}}</span></p>
					</td>
					<td style='width:84.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:10.4pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'>
							<span style='font-size:7.0pt;font-family:"Arial",sans-serif;color:#333333'>{{x.PREC_AFILIADO_DOC}}</span></p>
					</td>
					<td style='width:84.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:10.4pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'>
							<span style='font-size:7.0pt;font-family:"Arial",sans-serif;color:#333333'>{{x.NOMBRE_AFILIADO}}</span></p>
					</td>
					<td style='width:84.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:10.4pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'>
							<span style='font-size:7.0pt;font-family:"Arial",sans-serif;color:#333333'>{{x.VALOR}}</span></p>
					</td>
					<td style='width:84.15pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:10.4pt'>
						<p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:center;line-height:normal'>
							<span style='font-size:7.0pt;font-family:"Arial",sans-serif;color:#333333'>{{x.FECHA_PAGO}}</span></p>
					</td>

				</tr>

			</table>

		</div>



		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><b><span style='font-size:7.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></b></p>
		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><b><span style='font-size:7.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></b></p>
		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><b><span style='font-size:7.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></b></p>
		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><b><span style='font-size:7.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></b></p>

		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:justify'>
			<div style='font-size: 11px;line-height:107%;font-family:"Arial";'>
				Nota: En caso de no registrar alguna prestación económica, favor comunicarse al teléfono (5) 318 5930 Ext. 310 <br>
				o a los correos electrónicos presteconomicas1@cajacopieps.com - presteconomicas2@cajacopieps.com
			</div>

		</p>

		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>
		<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>



		<?php $mes = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"); ?>
		<p class=MsoNoSpacing><span style='font-size:8.0pt'>&nbsp;</span></p>
		<div id="t1b_1" class="t s2_1" style="font-family:'Arial';left: 0;bottom: 353px;letter-spacing: -0.2px;word-spacing: 0.4px;">Se expide a los (<?php $hoy = date("d"); echo $hoy; ?>) días del mes de <?php echo $mes[date('n') - 1]; ?> de <?php $hoy = date("Y");
																																																												echo $hoy; ?>. </div>
		<div>

			<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>
			<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>
			<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>
			<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>
			<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>
			<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>
			<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>
			<!-- <img src="../../../images/firma-alexander.jpeg" alt="" style="height: 82px;width: 144px;margin: 0;"> -->
			<img src="../../../images/FirmaCesar.png" alt="" style="height: 82px;width: 144px;margin: 0;">


			<!-- <p class=MsoNoSpacing><span style='font-size:8.0pt'>______________________________________________________________________________</span></p> -->

			<p class=MsoNoSpacing><b><span style='font-size:15.0pt;font-family:"Arial",sans-serif'> <strong>SUBDIRECCION NACIONAL DE REGIMEN CONTRIBUTIVO</strong></span></b></p>
			<!-- <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span style='font-size:10.0pt;line-height:107%;font-family:"Tahoma",sans-serif'>Aprobó:Luis Hely Castellanos Rodriguez – Coordinador Nacional de Administración De Base De Datos</span></p> -->
			<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span style='font-size:10.0pt;line-height:107%;font-family:"Tahoma",sans-serif'>Generado Por:<?php echo $_SESSION['usu'] ?></span></p>
			<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span style='font-size:10.0pt;line-height:107%;font-family:"Tahoma",sans-serif'>Fecha y Hora:<?php $hoy = date("d/m/Y  g:i a"); echo $hoy; ?></span></p>
			<img src="imagen.png " style="position: absolute;z-index: -1;right: 0;bottom: -145px;zoom:0.9;">
		</div>
</body>
</html>