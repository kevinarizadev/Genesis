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
	top: 186px;
	width: 567px;
	height: 30px;
	z-index: 1;
}
#apDiv2 {
	position: absolute;
	left: 39px;
	top: 232px;
	width: 701px;
	height: 114px;
	z-index: 2;
}
#apDiv3 {
	position: absolute;
	left: 40px;
	top: 357px;
	width: 773px;
	height: 39px;
	z-index: 3;
}
#apDiv4 {
	position: absolute;
	left: 39px;
	top: 413px;
	width: 798px;
	height: 190px;
	z-index: 4;
	line-height: 150%;
	text-align: justify;
}
#apDiv5 {
	position: absolute;
	left: 40px;
	top: 629px;
	width: 804px;
	height: 265px;
	z-index: 5;
	line-height: 140%;
	text-align: justify;
}

.claseqr {
	position: absolute;
	top: 100px;
	right: 57px;
	z-index: 12;
	text-align:center;
	font-size: 15px;
}
</style>
<script src="../../../bower_components/angular/angular.js"></script>
<script src="../../../bower_components/jquery/dist/jquery.js"></script>
<script type="text/javascript" src="../../../js/qr-code-styling@1.5.0.js"></script>
<!-- <script type="text/javascript" src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script> -->
<script src="../../../scripts/controllers/consultaafiliados/soportes/cert_portabilidad.js"></script>
</head>
<body ng-controller="cert_portabilidadctrl">
<div id="apDiv1">Barranquilla, </div>
<div id="apDiv2">SEÑOR (a)<br />
				<strong>{{data.NOMBRE}}</strong><br />
                {{data.DOCUMENTO}}<br />
                {{data.EMAIL}}<br />
                {{data.UBICACION}}
</div>
<div id="apDiv3"><strong>Referencia: Asignación IPS Primaria CAJACOPIEPS SAS</strong></div>
<div id="apDiv4">Cordial saludo,<br /><br />
  Teniendo en cuenta su solicitud de portabilidad de fecha {{data.FECHA_SOLICITUD}} con tiempo de <b>permanencia de {{data.TIEMPO}}</b> para la ciudad de {{data.MUNICIPIO}} y en cumplimiento con el decreto 1683 de 2013 por medio del cual establece que todas las EPS deben garantizar el acceso a los servicios de salud de sus afiliados en todo el territorio nacional, me permito notificarle que la IPS primaria asignada para el usuario {{data.AFILIADO}} identificada con {{data.TIPO_DOCUMENTO}} {{data.NUMERO_DOCUMENTO}}, es la {{data.IPS_ASIGNADA}}.</div>

<div id="apDiv5">Cabe mencionar que ante cualquier solicitud de servicios, la IPS debe comunicarse directamente a
nuestro centro de autorizaciones, a través de nuestra línea gratuita 01 8000 111446.

</br><br />
Así mismo le informo que ante cualquier inquietud, duda, sugerencia o felicitación puede comunicarse
a través de este correo portabilidad@cajacopieps.com
<br><br>
{{data.TEXT2}}

<br /><br />Atentamente,<br />
<!-- <img src="firma_portabilidad.png" width="248" height="101" /> -->
<br />
<!-- <b>Asistente Nacional de Contratacion de Red</b> -->
<!-- ------------------------------------------------------------------------- -->
<div class="subdireccion" style="font-weight: bold;">
	<div>SUBDIRECCION NACIONAL OPERACIONES</div>
	<div>Codigo de verificacion: {{Codigo_QR}}</div>
	<div>Generado por: {{usuariogenera}}</div>
	<br>
	<!-- <div>ESTE DOCUMENTO NO ES VALIDO PARA LA PRESTACION DEL SERVICIO, NI PARA TRASLADO</div> -->
</div>
<!-- ----------------------------------------------------------- -->

</div>

<!-- <div id="qrcode1" class="claseqr"></div> -->
<img src="marca_de_agua_certificado_afiliacion.jpg" style="width: 100%;"/>
<!-- <img src="port1.png" width="955" height="149" style="padding-top:30px; position: absolute;" />
<img src="port2.png" width="934" height="180" style="padding-top:950px; position: absolute;"/> -->
</body>
</html>