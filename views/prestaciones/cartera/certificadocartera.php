<?php 
	session_start();
	if (!isset($_SESSION['nombre'])) {
		header("Location: ../../../index.html");
	}
	?>
<html>

<html ng-app = "GenesisApp">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<title>Certificado Cartera</title>
			<link rel="icon" href="../../../assets/images/icon.ico" />
			<script src="../../../bower_components/angular/angular.js"></script>
			<script src="../../../bower_components/jquery/dist/jquery.js"></script>
			<script src="../../../bower_components/angular-route/angular-route.js"></script>
			<script src="../../../scripts/controllers/prestacioneseconomicas/CertificadoCarteraController.js"></script>
		<script src="../../../scripts/services/util/communication.js"></script>

<style>

 /* Font Definitions */
 @font-face
	{font-family:Wingdings;
	panose-1:5 0 0 0 0 0 0 0 0 0;}
@font-face
	{font-family:"Cambria Math";
	panose-1:2 4 5 3 5 4 6 3 2 4;}
@font-face
	{font-family:Calibri;
	panose-1:2 15 5 2 2 2 4 3 2 4;}
@font-face
	{font-family:"Segoe UI";
	panose-1:2 11 5 2 4 2 4 2 2 3;}
@font-face
	{font-family:Tahoma;
	panose-1:2 11 6 4 3 5 4 4 2 4;}
 /* Style Definitions */
 p.MsoNormal, li.MsoNormal, div.MsoNormal
	{margin-top:0cm;
	margin-right:0cm;
	margin-bottom:8.0pt;
	margin-left:0cm;
	line-height:107%;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;}
p.MsoHeader, li.MsoHeader, div.MsoHeader
	{mso-style-link:"Encabezado Car";
	margin:0cm;
	margin-bottom:.0001pt;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;}
p.MsoFooter, li.MsoFooter, div.MsoFooter
	{mso-style-link:"Pie de página Car";
	margin:0cm;
	margin-bottom:.0001pt;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;}
a:link, span.MsoHyperlink
	{color:#0563C1;
	text-decoration:underline;}
a:visited, span.MsoHyperlinkFollowed
	{color:#954F72;
	text-decoration:underline;}
p.MsoAcetate, li.MsoAcetate, div.MsoAcetate
	{mso-style-link:"Texto de globo Car";
	margin:0cm;
	margin-bottom:.0001pt;
	font-size:9.0pt;
	font-family:"Segoe UI",sans-serif;}
p.MsoNoSpacing, li.MsoNoSpacing, div.MsoNoSpacing
	{margin:0cm;
	margin-bottom:.0001pt;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;}
p.MsoListParagraph, li.MsoListParagraph, div.MsoListParagraph
	{margin-top:0cm;
	margin-right:0cm;
	margin-bottom:0cm;
	margin-left:36.0pt;
	margin-bottom:.0001pt;
	font-size:11.0pt;
	font-family:"Calibri",sans-serif;}
span.EncabezadoCar
	{mso-style-name:"Encabezado Car";
	mso-style-link:Encabezado;}
span.PiedepginaCar
	{mso-style-name:"Pie de página Car";
	mso-style-link:"Pie de página";}
span.TextodegloboCar
	{mso-style-name:"Texto de globo Car";
	mso-style-link:"Texto de globo";
	font-family:"Segoe UI",sans-serif;}
.MsoChpDefault
	{font-family:"Calibri",sans-serif;}
.MsoPapDefault
	{margin-bottom:8.0pt;
	line-height:107%;}
 /* Page Definitions */
 @page WordSection1
	{size:612.0pt 792.0pt;
	margin:0cm 87.5pt 70.85pt 3.0cm;}
div.WordSection1
	{page:WordSection1;}
 /* List Definitions */
 ol
	{margin-bottom:0cm;}
ul
	{margin-bottom:0cm;}

</style>

</head>

<body lang=ES-CO link="#0563C1" vlink="#954F72" ng-controller="CertificadoCarteraController">

<div class=WordSection1 style="position: 	relative;	"	>
<img src="https://genesis.cajacopieps.com//assets/images/cajacopi.png " width="100px;" style="padding: 	10px">
<p class=MsoNormal style='margin-left:7.1pt;text-align:justify;text-indent:
-7.1pt'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>Barranquilla,
06 de marzo de 2019</span></p>

<p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;
margin-left:-35.45pt;margin-bottom:.0001pt;text-align:justify;text-indent:35.45pt'><span
style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>

<p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;
margin-left:-35.45pt;margin-bottom:.0001pt;text-align:justify;text-indent:35.45pt'><span
style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify;text-indent:35.45pt'><span style='font-size:8.0pt;line-height:107%;
font-family:"Arial",sans-serif'>Señores:</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify;text-indent:35.45pt'><b><span style='font-size:8.0pt;line-height:107%;
font-family:"Arial",sans-serif'>{{NOMBRE_EMPRESA}}</span></b></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify;text-indent:35.45pt'><b><span style='font-size:8.0pt;line-height:107%;
font-family:"Arial",sans-serif'>{{APO_DIRECCION}}</span></b></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify;text-indent:35.45pt'><b><span style='font-size:8.0pt;line-height:107%;
font-family:"Arial",sans-serif'>{{APO_TELEFONO}}</span></b></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify;text-indent:35.45pt'><b><span style='font-size:8.0pt;line-height:107%;
font-family:"Arial",sans-serif'>{{DEPARTAMENTO}} - {{MUNICIPIO}}</span></b></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><b><span
style='font-size:7.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></b></p>

<p class=MsoNormal align=right style='margin-bottom:0cm;margin-bottom:.0001pt;
text-align:right;text-indent:35.45pt'><b><span style='font-size:8.0pt;
line-height:107%;font-family:"Arial",sans-serif'>Asunto: </span></b><span
style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>Respuesta
a solicitud de estado de cartera. </span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><span style='font-size:9.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify;text-indent:35.45pt'><span style='font-size:8.0pt;line-height:107%;
font-family:"Arial",sans-serif'>Respetados Señores: </span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify;text-indent:35.45pt'><span style='font-size:8.0pt;line-height:107%;
font-family:"Arial",sans-serif'>&nbsp;</span></p>

<p class=MsoNormal style='margin-top:0cm;margin-right:0cm;margin-bottom:0cm;
margin-left:7.1pt;margin-bottom:.0001pt;text-align:justify;text-indent:-7.1pt'><span
style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>Reciba
un cordial saludo de CAJACOPI EPS. </span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>Teniendo
en cuenta la solicitud radicada el día 20 de febrero de 2019, donde solicita el
estado de cuenta de la empresa que usted representa, me permito notificar lo
siguiente:</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>El
empleador es responsable de reportar oportunamente las novedades generadas
dentro del mes, a más tardar dentro del mes siguiente, teniendo en cuenta lo
establecido en el Artículo 2.2.1.1.3.5 por el Decreto 780 de 2016<sup>1</sup>.</span></p>

<p class=MsoNormal style='margin-top:0cm;margin-right:99.25pt;margin-bottom:
0cm;margin-left:0cm;margin-bottom:.0001pt;text-align:justify'><span
style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>Así
mismo, en el caso de no realizar el reporte de las novedades de manera
oportuna, se realizará la suspensión de la afiliación, según lo menciona en el
Articulo 2.1.9.1. por el Decreto 780 de 2016<sup>2</sup>, </span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>Lo
anterior no lo exime de la responsabilidad de los aportes adeudados a la fecha,
como también de los intereses moratorios que se generen al momento de la
liquidación de los aportes (Artículo 23 de la Ley 100 de1993<sup>3</sup>). Para
liquidar los valores adeudados al SGSSS, debe realizarlo a través de la
plataforma tecnológica del Operador de su preferencia, mediante la Planilla
Integrada de Liquidación de Aportes (PILA).</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>Por
otra parte, revisada nuestra base de datos encontramos que su entidad presenta
el siguiente estado de cartera recursos pertenecientes al Sistema General de
Seguridad Social en Salud &quot;SGSSS&quot;, así:</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><span style='font-size:9.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>

<div align=center>

<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0
 style='background:white;border-collapse:collapse;border:none'>
 <tr style='height:1.0pt'>
  <td width=131 style='width:98.35pt;border:solid windowtext 1.0pt;background:
  #F2F2F2;padding:0cm 3.5pt 0cm 3.5pt;height:1.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
  text-align:center;line-height:normal'><b><span lang=ES style='font-size:8.0pt;
  font-family:"Arial",sans-serif'>Tipo de ID Cotizante</span></b></p>
  </td>
  <td style='border:solid windowtext 1.0pt;border-left:none;background:#F2F2F2;
  padding:0cm 3.5pt 0cm 3.5pt;height:1.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
  text-align:center;line-height:normal'><b><span lang=ES style='font-size:8.0pt;
  font-family:"Arial",sans-serif'>Nombre y apellidos Cotizante</span></b></p>
  </td>
  <td style='border:solid windowtext 1.0pt;border-left:none;background:#F2F2F2;
  padding:0cm 3.5pt 0cm 3.5pt;height:1.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
  text-align:center;line-height:normal'><b><span lang=ES style='font-size:8.0pt;
  font-family:"Arial",sans-serif'>Días</span></b></p>
  </td>
  <td width=112 style='width:84.15pt;border:solid windowtext 1.0pt;border-left:
  none;background:#F2F2F2;padding:0cm 3.5pt 0cm 3.5pt;height:1.0pt'>
  <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
  justify;line-height:normal'><b><span lang=ES style='font-size:8.0pt;
  font-family:"Arial",sans-serif'>Periodos en mora</span></b></p>
  </td>
 </tr>
 <tr style='height:10.4pt' ng-repeat="x in informacion"> 
  <td width=131 style='width:98.35pt;border:solid windowtext 1.0pt;border-top:
  none;padding:0cm 3.5pt 0cm 3.5pt;height:10.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
  text-align:center;line-height:normal'><span style='font-size:7.0pt;
  font-family:"Arial",sans-serif;color:#333333'>{{x.DOCUMENTO}}</span></p>
  </td>
  <td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:10.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
  text-align:center;line-height:normal'><span style='font-size:7.0pt;
  font-family:"Arial",sans-serif;color:#333333'>{{x.NOMBRE}}</span></p>
  </td>
  <td style='border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
  border-right:solid windowtext 1.0pt;padding:0cm 3.5pt 0cm 3.5pt;height:10.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
  text-align:center;line-height:normal'><span style='font-size:7.0pt;
  font-family:"Arial",sans-serif;color:#333333'>{{x.DIAS}}</span></p>
  </td>
  <td width=112 style='width:84.15pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0cm 3.5pt 0cm 3.5pt;height:10.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
  text-align:center;line-height:normal'><span style='font-size:7.0pt;
  font-family:"Arial",sans-serif;color:#333333'>{{x.PERIODO}}</span></p>
  </td>
 </tr>



</table>

</div>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><b><u><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'><span
 style='text-decoration:none'>&nbsp;</span></span></u></b></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><b><u><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>¡No
Olvide!:</span></u></b><span style='font-size:8.0pt;line-height:107%;
font-family:"Arial",sans-serif'> Cuando usted está sin recursos para seguir
cancelando aportes en Seguridad Social, debe reportar la Novedad de Retiro a la
EPS.</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
justify'><span style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>Nuestro
interés es solucionar la mora existente con el &quot;SGSSS&quot;, por tanto,
cualquier información adicional estamos atentos a servirle, contactándonos en
el teléfono 3185930 extensión 239 de la ciudad de BARRANQUILLA o al correo
electrónico: CARTCONTRIBUTIVO1@CAJACOPIEPS.COM.  Si usted ya canceló favor
hacer caso omiso</span><span style='font-size:7.0pt;line-height:107%;
font-family:"Arial",sans-serif'>.</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span
style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>&nbsp;</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span
style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'>Cordial
Saludo.</span></p>

<!-- <p class=MsoNoSpacing><span style='font-size:8.0pt'>&nbsp;</span></p> -->
<img src="../../../images/firma_elkin.png" alt="" style="height: 82px;width: 144px;margin: 0;">

<p class=MsoNoSpacing><span style='font-size:8.0pt'>___________________________________</span></p>

<!-- <p class=MsoNoSpacing><b><span style='font-size:9.0pt;font-family:"Arial",sans-serif'>ELKIN
GUERRA ANGARITA</span></b></p> -->

<p class=MsoNoSpacing><span style='font-size:9.0pt;font-family:"Arial",sans-serif'> SUBDIRECCION NACIONAL DE REGIMEN CONTRIBUTIVO</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span
style='font-size:8.0pt;line-height:107%'></span></p>

<!-- <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span
style='font-size:7.0pt;line-height:107%;font-family:"Tahoma",sans-serif'>Aprobó:
Luis Hely Castellanos Rodriguez – Coordinador Nacional de ABDA</span></p> -->

<!-- <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span
style='font-size:7.0pt;line-height:107%;font-family:"Tahoma",sans-serif'>Revisó:
Luz Elena Figueredo Calderon – Asistente Nacional de Afiliación y Registro</span></p> -->

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span
style='font-size:7.0pt;line-height:107%;font-family:"Tahoma",sans-serif'>Proyectó:
<?php echo $_SESSION['nombre'] ?>, Auxiliar Nacional de Afiliación Registro y Mercadeo</span></p>

<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span
style='font-size:8.0pt;line-height:107%;font-family:"Arial",sans-serif'> </span><u><span
style='font-size:8.0pt;line-height:107%'>                              _______________________________________________</span></u></p>

<p class=MsoListParagraphCxSpFirst style='margin-right:99.25pt;text-align:justify;
text-indent:-18.0pt'><span style='font-size:7.0pt;font-family:"Arial",sans-serif;
color:black'>1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span style='font-size:7.0pt;font-family:"Arial",sans-serif;
color:black;background:white'>Artículo 2.2.1.1.3.5 Responsabilidad por Reporte
No Oportuno.</span></p>

<p class=MsoListParagraphCxSpLast style='margin-right:99.25pt;text-align:justify;
text-indent:-18.0pt'><span style='font-size:7.0pt;font-family:"Arial",sans-serif;
color:black'>2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></span><span style='font-size:7.0pt;font-family:"Arial",sans-serif;
color:black;background:white'>Artículo 2.1.9.1. Efectos de la mora en las
cotizaciones de trabajadores dependientes.</span></p>

<p class=MsoNormal style='margin-left:7.1pt;text-align:justify;text-indent:
-7.1pt'><span style='font-size:7.0pt;line-height:107%;font-family:"Arial",sans-serif;
color:black;background:white'>             3.      Artículo 23 Sanción Moratoria</span></p>
<img src="imagen.png " style="    position: absolute;    z-index: -1;    right: 0;    bottom: -145px;	zoom:0.9;
">
</div>

</body>

</html>


