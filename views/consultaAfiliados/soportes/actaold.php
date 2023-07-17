<?php 
  session_start();
  if (!isset($_SESSION['nombre'])) {
      header("Location: ../../../index.html");
  }
?>
<html ng-app="GenesisApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Acta de entrega</title>
<link rel="icon" href="../../../assets/images/icon.ico" />
<script src="../../../bower_components/angular/angular.js"></script>
<script src="../../../bower_components/jquery/dist/jquery.js"></script>
<script src="../../../scripts/controllers/consultaafiliados/soportes/actacontroller.js"></script>
<script src="../../../scripts/const/const.js"></script>
<script type="text/javascript" src="../../../js/ngStorage.js"></script>
<style type="text/css">
	*{
		font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
		
		font-style: normal;
		font-variant: normal;
	}
	#table1 {
		width: 100%;
		border-collapse: collapse;
		border-style: solid;
		border-color: black;
		border-width: 1px;
	}
	#table1 th{
		border-collapse: collapse;
		border-style: solid;
		border-color: black;
		border-width: 1px;
	}
	#table1 td{
		padding:2px;
		border-collapse: collapse;
		border-style: solid;
		border-color: black;
		border-width: 1px;
	}
	#table2 {
		width: 100%;
		border-collapse: collapse;
	}
	#table2 th{
		border-collapse: collapse;
	}
	#table2 td{
		padding:3px;
		border-collapse: collapse;
	}
	#title {
		position: absolute;
		font-size: 30px;
		left: 334px;
		top: 159px;
		width: 294px;
		height: 30px;
		text-align: center;
	}
	#tablas {
		position: absolute;
		width: 826px;
		height: 462px;
		left: 34px;
		top: 205px;
		border-bottom: 3px;
		border-bottom-style: solid;
	}
	#content {
		position: absolute;
		left: 28px;
		top: 28px;
		width: 900px;
		height: 1021px;
	}
	#text {
		position: absolute;
		text-align: center;
		top: 181px;
		width: 675px;
		height: 25px;
		z-index: 1;
		left: 124px;
	}
	#apDiv1 {
		position: absolute;
		left: 747px;
		top: 143px;
		width: 109px;
		height: 20px;
		z-index: 2;
	}
	#apDiv2 {
		position: absolute;
		left: 228px;
		top: 724px;
		width: 377px;
		height: 22px;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}
	#apDiv3 {
		position: absolute;
		left: 67px;
		top: 729px;
		width: 149px;
		height: 21px;
	}
	#apDiv4 {
		position: absolute;
		left: 68px;
		top: 753px;
		width: 648px;
		height: 72px;
	}
	#apDiv5 {
		position: absolute;
		left: 66px;
		top: 846px;
		width: 82px;
		height: 23px;
	}
	#nombre_aut {
		position: absolute;
		left: 161px;
		top: 847px;
		width: 339px;
		height: 20px;
		border-bottom: 1px;
		border-bottom-style: solid;
	}
	#apDiv6 {
		position: absolute;
		left: 517px;
		top: 850px;
		width: 49px;
		height: 20px;
	}
	#edad {
		position: absolute;
		left: 571px;
		top: 843px;
		width: 164px;
		height: 23px;
		border-bottom: 1px;
		border-bottom-style: solid;
	}
	#apDiv7 {
		position: absolute;
		left: 64px;
		top: 950px;
		width: 89px;
		height: 26px;
	}
	#apDiv8 {
		position: absolute;
		left: 452px;
		top: 895px;
		width: 112px;
		height: 23px;
	}
	#direccion {
		position: absolute;
		left: 159px;
		top: 950px;
		width: 268px;
		height: 20px;
		border-bottom: 1px;
		border-bottom-style: solid;
	}
	#documento {
		position: absolute;
		left: 570px;
		top: 891px;
		width: 168px;
		height: 19px;
		border-bottom: 1px;
		border-bottom-style: solid;
	}
	#apDiv9 {
		position: absolute;
		left: 786px;
		top: 709px;
		width: 102px;
		height: 136px;
		border: 1px;
		border-style: solid;
	}
	#apDiv10 {
		position: absolute;
		left: 784px;
		top: 858px;
		width: 104px;
		height: 128px;
		border: 1px;
		border-style: solid;
	}
	#apDiv11 {
		position: absolute;
		left: 741px;
		top: 720px;
		width: 41px;
		height: 118px;
	}
	#apDiv12 {
		position: absolute;
		left: 741px;
		top: 860px;
		width: 41px;
		height: 118px;
	}
	#apDiv13 {
		position: absolute;
		left: 783px;
		top: 490px;
		width: 28px;
		height: 17px;
		border-style: solid;
		border-width: 1px;
		border-radius: 20px;
	}
	#apDiv14 {
		position: absolute;
		left: 842px;
		top: 490px;
		width: 28px;
		height: 17px;
		border-style: solid;
		border-width: 1px;
		border-radius: 20px;
	}
	#apDiv15 {
		position: absolute;
		left: 783px;
		top: 534px;
		width: 28px;
		height: 17px;
		border-style: solid;
		border-width: 1px;
		border-radius: 20px;
	}
	#apDiv16 {
		position: absolute;
		left: 842px;
		top: 534px;
		width: 28px;
		height: 17px;
		border-style: solid;
		border-width: 1px;
		border-radius: 20px;
	}
	#apDiv17 {
		position: absolute;
		left: 783px;
		top: 577px;
		width: 28px;
		height: 17px;
		border-style: solid;
		border-width: 1px;
		border-radius: 20px;
	}
	#apDiv18 {
		position: absolute;
		left: 842px;
		top: 577px;
		width: 28px;
		height: 17px;
		border-style: solid;
		border-width: 1px;
		border-radius: 20px;
	}
	#apDiv19 {
		position: absolute;
		left: 783px;
		top: 616px;
		width: 28px;
		height: 17px;
		border-style: solid;
		border-width: 1px;
		border-radius: 20px;
	}
	#apDiv20 {
		position: absolute;
		left: 842px;
		top: 616px;
		width: 28px;
		height: 17px;
		border-style: solid;
		border-width: 1px;
		border-radius: 20px;
	}
	#apDiv21 {
		position: absolute;
		left: 783px;
		top: 648px;
		width: 28px;
		height: 17px;
		border-style: solid;
		border-width: 1px;
		border-radius: 20px;
	}
	#apDiv22 {
		position: absolute;
		left: 842px;
		top: 648px;
		width: 28px;
		height: 17px;
		border-style: solid;
		border-width: 1px;
		border-radius: 20px;
	}
</style>
</head>

<body ng-controller="actaController">
<div id="title"><center><strong>ACTA DE ENTREGA</strong></center></div>
<div id="content">
  <div id="tablas">
   	<center>
      <table id="table1">
          <tr>
            <td width="193"><strong>Nombres y apellidos:</strong></td>
            <td colspan="3"><center>{{name_c}}</center></td>
          </tr>
          <tr>
            <td><strong>Documento de identidad:</strong></td>
            <td width="211"><center>{{numero_documento}}</center></td>
            <td width="164"><strong>Fecha de nacimiento:</strong></td>
            <td width="238"><center>{{fecha_nacimiento}}</center></td>
          </tr>
          <tr>
            <td><strong>Dirección:</strong></td>
            <td><center>{{direccion}}</center></td>
            <td><strong>Barrio:</strong></td>
            <td><center>{{barrio}}</center></td>
          </tr>
          <tr>
            <td><strong>Municipio:</strong></td>
            <td><center>{{municipio}}</center></td>
            <td><strong>Correo:</strong></td>
            <td><center>{{correo}}</center></td>
          </tr>
          <tr>
            <td><strong>Teléfono:</strong></td>
            <td><center>{{tel_fijo}}</center></td>
            <td><strong>Celular:</strong></td>
            <td><center>{{tel_celular}}</center></td>
          </tr>
      </table>
      <br />
      <img src="title.png" width="336" height="60" /><img src="logo.png" width="67" height="54" /><br /><br />
        <table height="231" id="table2">
          <tr>
            <th width="8%" height="31">ÍTEMS</th>
            <th width="78%">CONTENIDO DE LA EVALUACIÓN</th>
            <th width="7%">SI</th>
            <th width="7%">NO</th>
          </tr>
          <tr>
            <td><center>1°.</center></td>
            <td>¿Antes del diligenciamiento del formulario de afiliación, CAJACOPI EPS, le hizo entrega de la Carta de Derechos y Deberes del Afiliado y del Paciente?</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td><center>2°.</center></td>
            <td>¿Antes del diligenciamiento del formulario de afiliación, CAJACOPI EPS, le hizo entrega de la Carta de Desempeño, donde se presenta de manera clara, su puesto en el Ranking?
</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td><center>3°.</center></td>
            <td>¿Leyó el contenido de la Carta de Derechos y Deberes del Afiliado y del Paciente de CAJACOPI EPS?</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td><center>4°.</center></td>
            <td>¿Leyó el contenido de la Carta de Desempeño de CAJACOPI EPS?</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td><center>5°.</center></td>
            <td>¿Si tuvo alguna duda sobre el contenido de la información, fue asesorado adecuadamente por CAJACOPI EPS?
</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table>
    </center>
  </div>
<div id="text">CARNÉ, CARTA DE DERECHOS Y DEBERES DEL AFILIADO Y DEL PACIENTE - CARTA DE DESEMPEÑO</div>
  <div id="apDiv1" style="color: blue;"><strong>GMAR-014-FR</strong></div></div>
<div id="apDiv2"></div>
<div id="apDiv3">FIRMA DEL AFILIADO</div>
<div id="apDiv4">NOTA: Sí el afiliado no sabe o no puede firmar el diligenciamiento y suscripción de esta  evaluación, la efectuará la persona a quien él ruegue, lo cual deberá ser ratificado con la  imposición de la Huella Dactilar, Nombre, Edad, Identificación, domicilio, de a quien  autorice a ruego. </div>
<div id="apDiv5">NOMBRE: </div>
<div id="nombre_aut"></div>
<div id="apDiv6">EDAD:</div>
<div id="edad"></div>
<div id="apDiv7">DOMICILIO:</div>
<div id="apDiv8">IDENTIFICACIÓN:</div>
<div id="direccion"></div>
<div id="documento"></div>
<div id="apDiv9"></div>
<div id="apDiv10"></div>
<div id="apDiv11">
<img src="huella.png" width="34" height="111" /></div>
<div id="apDiv12">
<img src="huella.png" width="34" height="111" /></div>
<div id="apDiv13"></div>
<div id="apDiv14"></div>
<div id="apDiv15"></div>
<div id="apDiv16"></div>
<div id="apDiv17"></div>
<div id="apDiv18"></div>
<div id="apDiv19"></div>
<div id="apDiv20"></div>
<div id="apDiv21"></div>
<div id="apDiv22"></div>
</body>
</html>
