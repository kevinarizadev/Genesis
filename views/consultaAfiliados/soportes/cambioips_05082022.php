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
<script src="../../../scripts/controllers/consultaafiliados/soportes/CambioIPSController.js"></script>
<script src="../../../scripts/const/const.js"></script>
<script type="text/javascript" src="../../../js/ngStorage.js"></script>
</head>

<body style="margin: 0;" ng-controller="CambioIPSController">

<div id="p1" style="overflow: hidden; position: relative; background-color: white; width: 935px; height: 1210px;">


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


<style type="text/css" >

#t1_1{left:313px;bottom:1117px;letter-spacing:0.1px;word-spacing:-0.1px;}
#t2_1{left:695px;bottom:1128px;letter-spacing:0.1px;word-spacing:-0.1px;}
#t3_1{left:695px;bottom:1100px;letter-spacing:0.1px;word-spacing:-0.1px;}
#t4_1{left:320px;bottom:1070px;letter-spacing:0.1px;word-spacing:0.2px;}
#t5_1{left:695px;bottom:1070px;letter-spacing:0.2px;word-spacing:-0.2px;}
#t6_1{left:195px;bottom:1019px;word-spacing:0.1px;}
#t7_1{left:422px;bottom:1019px;word-spacing:0.1px;}
#t8_1{left:551px;bottom:1019px;}
#t9_1{left:740px;bottom:1019px;}
#ta_1{left:108px;bottom:1003px;}
#tb_1{left:420px;bottom:1003px;}
#tc_1{left:504px;bottom:1003px;}
#td_1{left:712px;bottom:1003px;letter-spacing:-0.1px;}
#te_1{left:766px;bottom:1003px;letter-spacing:-0.1px;}
#tf_1{left:821px;bottom:1003px;letter-spacing:-0.1px;}
#tg_1{left:236px;bottom:970px;}
#th_1{left:468px;bottom:970px;word-spacing:0.2px;}
#ti_1{left:759px;bottom:970px;}
#tj_1{left:108px;bottom:938px;}
#tk_1{left:420px;bottom:954px;letter-spacing:-0.1px;}
#tl_1{left:712px;bottom:954px;letter-spacing:-0.1px;}
#tm_1{left:163px;bottom:921px;word-spacing:-0.3px;}
#tn_1{left:504px;bottom:921px;}
#to_1{left:748px;bottom:921px;}
#tp_1{left:108px;bottom:905px;}
#tq_1{left:420px;bottom:905px;}
#tr_1{left:712px;bottom:905px;letter-spacing:-0.1px;}
#ts_1{left:108px;bottom:872px;}
#tt_1{left:504px;bottom:872px;}
#tu_1{left:108px;bottom:856px;}
#tv_1{left:504px;bottom:856px;letter-spacing:0.1px;}
#tw_1{left:108px;bottom:823px;letter-spacing:-0.2px;word-spacing:0.3px;}
#tx_1{left:240px;bottom:823px;letter-spacing:-0.7px;}
#ty_1{left:265px;bottom:823px;letter-spacing:-0.3px;}
#tz_1{left:325px;bottom:823px;letter-spacing:-0.3px;}
#t10_1{left:342px;bottom:823px;letter-spacing:-0.1px;word-spacing:0.4px;}
#t11_1{left:432px;bottom:823px;letter-spacing:-0.6px;}
#t12_1{left:449px;bottom:823px;letter-spacing:-0.1px;word-spacing:0.1px;}
#t13_1{left:595px;bottom:823px;letter-spacing:-0.1px;}
#t14_1{left:619px;bottom:823px;letter-spacing:-0.2px;word-spacing:0.4px;}
#t15_1{left:171px;bottom:798px;word-spacing:0.1px;}
#t16_1{left:470px;bottom:807px;word-spacing:0.2px;}
#t17_1{left:662px;bottom:807px;}
#t18_1{left:756px;bottom:807px;letter-spacing:-0.1px;word-spacing:-0.1px;}
#t19_1{left:421px;bottom:790px;word-spacing:0.1px;}
#t1a_1{left:491px;bottom:790px;word-spacing:0.1px;}
#t1b_1{left:661px;bottom:790px;letter-spacing:0.1px;}
#t1c_1{left:694px;bottom:790px;letter-spacing:-0.1px;}
#t1d_1{left:726px;bottom:790px;letter-spacing:-0.2px;}
#t1e_1{left:772px;bottom:792px;letter-spacing:0.1px;}
#t1f_1{left:840px;bottom:792px;letter-spacing:0.1px;}
#t1g_1{left:112px;bottom:768px;letter-spacing:0.2px;}
#t1h_1{left:112px;bottom:739px;letter-spacing:0.2px;}
#t1i_1{left:112px;bottom:711px;letter-spacing:0.2px;}
#t1j_1{left:112px;bottom:682px;letter-spacing:0.2px;}
#t1k_1{left:112px;bottom:654px;letter-spacing:0.2px;}
#t1l_1{left:112px;bottom:625px;letter-spacing:0.2px;}
#t1m_1{left:108px;bottom:604px;}
#t1n_1{left:134px;bottom:604px;letter-spacing:-0.2px;word-spacing:0.4px;}
#t1o_1{left:379px;bottom:604px;letter-spacing:0.1px;}
#t1p_1{left:398px;bottom:604px;letter-spacing:-0.1px;word-spacing:0.2px;}
#t1q_1{left:606px;bottom:604px;letter-spacing:-1px;}
#t1r_1{left:622px;bottom:604px;letter-spacing:-0.1px;}
#t1s_1{left:670px;bottom:604px;letter-spacing:-1px;}
#t1t_1{left:686px;bottom:604px;letter-spacing:-0.2px;}
#t1u_1{left:749px;bottom:604px;letter-spacing:-0.8px;}
#t1v_1{left:766px;bottom:604px;letter-spacing:-0.2px;}
#t1w_1{left:108px;bottom:588px;}
#t1x_1{left:210px;bottom:411px;letter-spacing:-0.2px;word-spacing:0.4px;}
#t1y_1{left:597px;bottom:411px;letter-spacing:-0.2px;word-spacing:0.5px;}
#t1z_1{left:660px;bottom:473px;letter-spacing:-0.1px;word-spacing:0.2px;}
#t20_1{left:779px;bottom:473px;word-spacing:-0.2px;}
#t21_1{left:837px;bottom:473px;letter-spacing:-0.5px;word-spacing:0.1px;}
#t22_1{left:144px;bottom:765px;}
#t23_1{left:437px;bottom:765px;}
#t24_1{left:507px;bottom:765px;}
#t25_1{left:663px;bottom:767px;}
#t26_1{left:695px;bottom:765px;}
#t27_1{left:727px;bottom:767px;}
#t28_1{left:775px;bottom:767px;}
#t29_1{left:840px;bottom:765px;}

.s1_1{
	FONT-SIZE: 60.9px;
	FONT-FAMILY: Arial-BoldMT_48;
	color: rgb(0,0,0);
}

.s2_1{
	FONT-SIZE: 55px;
	FONT-FAMILY: Arial-BoldMT_48;
	color: rgb(255,255,255);
}

.s3_1{
	FONT-SIZE: 55px;
	FONT-FAMILY: Arial-BoldMT_48;
	color: rgb(0,0,0);
}

.s4_1{
	FONT-SIZE: 49.1px;
	FONT-FAMILY: Arial-BoldMT_48;
	color: rgb(0,0,0);
}

.s5_1{
	FONT-SIZE: 49.1px;
	FONT-FAMILY: Arial-BoldMT_48;
	color: rgb(0,0,0);
}

.s6_1{
	FONT-SIZE: 49.1px;
	FONT-FAMILY: Arial-BoldMT_48;
	color: rgb(255,255,255);
}

.s7_1{
	FONT-SIZE: 42.5px;
	FONT-FAMILY: Arial-BoldMT_48;
	color: rgb(255,255,255);
}

.s8_1{
	FONT-SIZE: 55px;
	FONT-FAMILY: Arial-BoldMT_48;
	color: rgb(0,0,0);
}

.s9_1{
	FONT-SIZE: 49.1px;
	FONT-FAMILY: Arial-BoldMT_48;
	color: rgb(128,128,128);
}

.s10_1{
	FONT-SIZE: 61.1px;
	FONT-FAMILY: Helvetica, Arial, sans-serif;
	color: rgb(0,0,0);
}

</style>
<!-- End inline CSS -->

<!-- Begin embedded font definitions -->
<style id="fonts1" type="text/css" >

@font-face {
	font-family: Arial-BoldMT_48;
	src: url("cambioips/fonts/Arial-BoldMT_48.woff") format("woff");
}

@font-face {
	font-family: Arial-BoldMT_48;
	src: url("cambioips/fonts/Arial-BoldMT_48.woff") format("woff");
}

</style>
<!-- End embedded font definitions -->

<!-- Begin page background -->
<div id="pg1Overlay" style="width:100%; height:100%; position:absolute; z-index:1; background-color:rgba(0,0,0,0); -webkit-user-select: none;"></div>
<div id="pg1" style="-webkit-user-select: none;"><object width="935" height="1210" data="cambioips/1.svg" type="image/svg+xml" id="pdf1" style="width:935px; height:1210px; -moz-transform:scale(1); z-index: 0;"></object></div>
<!-- End page background -->


<!-- Begin text definitions (Positioned/styled in CSS) -->
<div id="t1_1" class="t s1_1">FORMATO SOLICITUD DE CAMBIO DE IPS</div>
<div id="t2_1" class="t s1_1">Código: GAI-FR-05 </div>
<div id="t3_1" class="t s1_1">Versión: 04 </div>
<div id="t4_1" class="t s1_1">INSTRUCTIVO PARA EL CAMBIO DE IPS</div>
<div id="t5_1" class="t s1_1">Fecha: mayo 2019 </div>
<div id="t6_1" class="t s2_1">Nombre del Solicitante </div>
<div id="t7_1" class="t s2_1">Tipo Doc. </div>
<div id="t8_1" class="t s2_1">No Documento </div>
<div id="t9_1" class="t s2_1">Fecha Solicitud </div>
<div id="ta_1" class="t s3_1">{{info.NOMBRE}} </div>
<div id="tb_1" class="t s3_1">{{info.TIPODOCUMENTO}} </div>
<div id="tc_1" class="t s3_1">{{info.DOCUMENTO}} </div>
<div id="td_1" class="t s3_1">{{dia}} </div>
<div id="te_1" class="t s3_1">{{mes}} </div>
<div id="tf_1" class="t s3_1">{{ano}} </div>
<div id="tg_1" class="t s2_1">Barrio </div>
<div id="th_1" class="t s2_1">Dirección Correspondencia </div>
<div id="ti_1" class="t s2_1">Municipio </div>
<div id="tj_1" class="t s3_1">{{info.LOCALIDAD}} </div>
<div id="tk_1" class="t s3_1">{{info.DIRECCION}} </div>
<div id="tl_1" class="t s3_1">{{info.MUNICIPIO}} </div>
<div id="tm_1" class="t s2_1">Dirección correo electrónico </div>
<div id="tn_1" class="t s2_1">Teléfono Celular</div>
<div id="to_1" class="t s2_1">Teléfono Fijo </div>
<div id="tp_1" class="t s3_1">{{info.CORREO}} </div>
<div id="tq_1" class="t s3_1">{{info.TELEFONO}} </div>
<div id="tr_1" class="t s3_1">{{info.TELEFONO}} </div>
<div id="ts_1" class="t s2_1">IPS en la Cual se encuentra Asignado </div>
<div id="tt_1" class="t s2_1">IPS para la cual se desea trasladar </div>
<div id="tu_1" class="t s3_1">{{info.IPS}} </div>
<div id="tv_1" class="t s3_1">{{ips.solicitada}} </div>
<div id="tw_1" class="t s4_1">Tipo de Documento: </div>
<div id="tx_1" class="t s4_1">CC.</div>
<div id="ty_1" class="t s5_1">Cédula </div>
<div id="tz_1" class="t s4_1">RC</div>
<div id="t10_1" class="t s5_1">. Registro Civil </div>
<div id="t11_1" class="t s4_1">TI.</div>
<div id="t12_1" class="t s5_1">Tarjeta de Identidad </div>
<div id="t13_1" class="t s4_1">CE.</div>
<div id="t14_1" class="t s5_1">Cédula de Extranjería </div>
<div id="t15_1" class="t s2_1">Nombre Usuario / Afiliado </div>
<div id="t16_1" class="t s2_1">Doc. Identificación </div>
<div id="t17_1" class="t s2_1">Parentesco </div>
<div id="t18_1" class="t s6_1">Motivo de Solicitud </div>
<div id="t19_1" class="t s2_1">T. Doc. </div>
<div id="t1a_1" class="t s2_1">Numero Identificación </div>
<div id="t1b_1" class="t s2_1">H </div>
<div id="t1c_1" class="t s2_1">C </div>
<div id="t1d_1" class="t s2_1">O </div>
<div id="t1e_1" class="t s7_1">CD </div>
<div id="t1f_1" class="t s7_1">IS </div>
<div id="t1g_1" class="t s8_1">1 </div>
<div id="t1h_1" class="t s8_1">2 </div>
<div id="t1i_1" class="t s8_1">3 </div>
<div id="t1j_1" class="t s8_1">4 </div>
<div id="t1k_1" class="t s8_1">5 </div>
<div id="t1l_1" class="t s8_1">6 </div>
<div id="t1m_1" class="t s4_1">CD: </div>
<div id="t1n_1" class="t s5_1">Cambio de Domicilio de Residencia </div>
<div id="t1o_1" class="t s4_1">IS: </div>
<div id="t1p_1" class="t s5_1">Inconformada con el Servicio </div>
<div id="t1q_1" class="t s4_1">H:</div>
<div id="t1r_1" class="t s5_1">Hijo </div>
<div id="t1s_1" class="t s4_1">C:</div>
<div id="t1t_1" class="t s5_1">Cónyuge </div>
<div id="t1u_1" class="t s4_1">O:</div>
<div id="t1v_1" class="t s5_1">Otro </div>
<div id="t1w_1" class="t s2_1">Observación: (Motivo por el cual solicita el cambio de la IPS de primer nivel de atención) </div>
<div id="t1x_1" class="t s4_1">Firma de Quien Recibe la Solicitud </div>
<div id="t1y_1" class="t s4_1">Firma de Quien Realiza la Solicitud </div>
<div id="t1z_1" class="t s4_1">Fecha de Recibido: </div>
<div id="t20_1" class="t s9_1">DD  / MM </div>
<div id="t21_1" class="t s9_1">/ AAA </div>
<div id="t22_1" class="t s10_1">{{info.NOMBRE}}</div>
<div id="t23_1" class="t s10_1">{{info.TIPODOCUMENTO}}</div>
<div id="t24_1" class="t s10_1">{{info.DOCUMENTO}}</div>
<div id="t25_1" class="t s10_1">{{info.PARENTESCO==2?'X':''}}</div>
<div id="t26_1" class="t s10_1">{{info.PARENTESCO==1?'X':''}} </div>
<div id="t27_1" class="t s10_1">{{info.PARENTESCO==3?'X':''}}</div>
<div id="t28_1" class="t s10_1"> </div>
<div id="t29_1" class="t s10_1"> </div>

<!-- End text definitions -->


</div>
</body>
</html>
