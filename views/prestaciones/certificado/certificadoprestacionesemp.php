<?php 
  session_start();
  if (!isset($_SESSION['nombre'])) {
      header("Location: ../../../index.html");
  }
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <title>Certificado - Prestaciones Economicas</title>
   <link rel="icon" href="../../../assets/images/icon.ico" />
   <script src="../../../bower_components/angular/angular.js"></script>
<script src="../../../bower_components/jquery/dist/jquery.js"></script>
<script src="../../../bower_components/angular-route/angular-route.js"></script>
<script src="../../../scripts/controllers/prestacioneseconomicas/CertificadoController.js"></script>
<script src="../../../scripts/services/util/communication.js"></script>
</head>
<style type="text/css">
   *{
			font-size : 16px;
			font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
		}
   table {
      border-collapse: collapse;
      font-size: 12px;
   }
   table, th, td {
      text-align: center;
      border: 1px solid black;
      font-size: 12px;
   }
   td{
      padding: 2px 4px 2px 4px;
      
   }
   thead{
      font-weight: bold;
      font-size: 12px;
   }
   .subraya{
      text-decoration: underline;
      font-size:15px;
      position: absolute;
    top: 671px;
    left: 300px;
	font-weight: bold;
   }
   #titulocertificado {
	position: absolute;
    left: 30%;
    top: 218px;
}
   #titulocertificado01 {
	position: absolute;
    left: 5%;
    top: 240px;
}
   #titulocertificado2 {
	position: absolute;
    left: 40%;
    top: 330px;
}
#texto_certificado {
	position: absolute;
	left: 10px;
	top: 450px;
	width: 794px;
	height: 43px;
	z-index: 2;
	/* font-weight: bold; */
}
.beneficiariosclase {
	position: absolute;
	top: 420px;
	width: 98%;
}

.subdireccion {
	position: absolute;
    top: 800px;
    left: 50px;
	font-weight: bold;
}
.nota {
	position: absolute;
    top: 700px;
    left: 50px;
	/* font-weight: bold; */
}
</style>
<body  ng-controller="CertificadoController">
<div id="titulocertificado">
   <strong>CAJACOPIEPS SAS NIT 901.543.211 - 6</strong>
</div>
 <!--  <div id="titulocertificado01">
			especial para la garantía y prestación del Plan de Beneficios en Salud denominado
			<strong>CAJACOPI EPS</strong>
</div> -->
   <div id="titulocertificado2">
	<h1 style="font-size: 22px;">CERTIFICA</h1>
</div>
<div id="texto_certificado"><div style="text-align: justify;">Que, luego de revisar en nuestro sistema de información, encontramos que la empresa
            <strong>{{nombreempresa2}}</strong>, identificada con <strong> NIT - {{nit2}}</strong> no registra radicación de incapacidades 
            médicas, ni pago alguno de prestación economica por concepto de incapacidades.
			</div></div>


<!-- ------------------------------------------------------------------------- -->
   <!-- <table class="beneficiariosclase">
      <thead>
         <td>No Incapacidad</td>
         <td>Tipo de Prestación</td>
         <td> Fecha de Inicio </td>
         <td> Fecha de Terminación </td>
         <td> Duración </td>
         <td> Diagnostico (Código CE10) </td>
         <td> No Documento Cotizante </td>
         <td> Nombres y apellidos Cotizante </td>
         <td> Valor Liquidado </td>
         <td> Fecha de Pago </td>
      </thead>
      <tr ng-repeat="x in res">
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
   </table> -->
   <!-- ------------------------------------------------------------------------- -->
   <div class="nota">Nota: En caso de no registrar alguna prestación económica, favor comunicarse al teléfono (5) 3185930 Ext. 8140 o a los correos
	   electrónicos presteconomicas1@cajacopieps.com - presteconomicas2@cajacopieps.com
   </div>
 
   <div class="subdireccion">
   <img style="z-index: 1;position: relative;left: 60px;" width="160" height="35" src="fima_luis_castellanos.png"/>
   <br>
      <div>COORDINADOR NACIONAL DE PRESTACIONES ECONOMICAS</div>
	<div>Fecha de generacion: {{dia}}/{{mes}}/{{anno}}</div>
	<div>Codigo de verificacion: {{Codigo_QR}}</div>
	<div>Generado por: {{usuariogenera}}</div>
	<br>
</div>
<!-- ----------------------------------------------------------- -->
<img src="marca_de_agua_certificado.jpg" style="width: 100%;"/>
</body>
</html>
