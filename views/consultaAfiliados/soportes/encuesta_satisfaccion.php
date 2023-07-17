<?php 
  session_start();
  if (!isset($_SESSION['nombre'])) {
      header("Location: ../../../index.html");
  }
?>
<html ng-app="GenesisApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Encuesta de Satisfacción</title>
<link rel="icon" href="../../../assets/images/icon.ico" />
<style type="text/css">
	*{
			font-size : 15px;
			font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
		}
	#apDiv1 {
		position: absolute;
		left: 591px;
		top: 422px;
		width: 64px;
		height: 26px;
		z-index: 1;
	}
	#apDiv2 {
	position: absolute;
	left: 663px;
	top: 422px;
	width: 64px;
	height: 25px;
	z-index: 2;
	}
	#apDiv3 {
	position: absolute;
	left: 733px;
	top: 422px;
	width: 64px;
	height: 24px;
	z-index: 3;
	}
	#apDiv4 {
	position: absolute;
	left: 806px;
	top: 422px;
	width: 64px;
	height: 26px;
	z-index: 4;
	}
	#apDiv5 {
	position: absolute;
	left: 878px;
	top: 422px;
	width: 64px;
	height: 25px;
	z-index: 5;
	}
	#apDiv6 {
		position: absolute;
		left: 591px;
		top: 468px;
		width: 64px;
		height: 35px;
		z-index: 6;
	}
	#apDiv7 {
		position: absolute;
		left: 663px;
		top: 469px;
		width: 64px;
		height: 33px;
		z-index: 7;
	}
	#apDiv8 {
		position: absolute;
		left: 733px;
		top: 469px;
		width: 64px;
		height: 36px;
		z-index: 8;
	}
	#apDiv9 {
	position: absolute;
	left: 806px;
	top: 470px;
	width: 64px;
	height: 35px;
	z-index: 9;
	}
	#apDiv10 {
	position: absolute;
	left: 878px;
	top: 469px;
	width: 64px;
	height: 38px;
	z-index: 10;
	}
	#apDiv11 {
		position: absolute;
		left: 591px;
		top: 514px;
		width: 64px;
		height: 31px;
		z-index: 11;
	}
	#apDiv12 {
		position: absolute;
		left: 663px;
		top: 513px;
		width: 64px;
		height: 31px;
		z-index: 12;
	}
	#apDiv13 {
	position: absolute;
	left: 733px;
	top: 512px;
	width: 64px;
	height: 28px;
	z-index: 13;
	}
	#apDiv14 {
		position: absolute;
		left: 806px;
		top: 516px;
		width: 64px;
		height: 29px;
		z-index: 14;
	}
	#apDiv15 {
	position: absolute;
	left: 878px;
	top: 515px;
	width: 64px;
	height: 28px;
	z-index: 15;
	}
	#apDiv16 {
	position: absolute;
	left: 591px;
	top: 543px;
	width: 64px;
	height: 22px;
	z-index: 16;
	}
	#apDiv17 {
	position: absolute;
	left: 663px;
	top: 542px;
	width: 64px;
	height: 21px;
	z-index: 17;
	}
	#apDiv18 {
	position: absolute;
	left: 733px;
	top: 539px;
	width: 64px;
	height: 22px;
	z-index: 18;
	}
	#apDiv19 {
	position: absolute;
	left: 806px;
	top: 543px;
	width: 64px;
	height: 23px;
	z-index: 19;
	}
	#apDiv20 {
	position: absolute;
	left: 878px;
	top: 546px;
	width: 64px;
	height: 23px;
	z-index: 20;
	}
	#apDiv21 {
	position: absolute;
	left: 591px;
	top: 574px;
	width: 64px;
	height: 33px;
	z-index: 21;
	}
	#apDiv22 {
	position: absolute;
	left: 663px;
	top: 574px;
	width: 64px;
	height: 34px;
	z-index: 22;
	}
	#apDiv23 {
	position: absolute;
	left: 733px;
	top: 575px;
	width: 64px;
	height: 33px;
	z-index: 23;
	}
	#apDiv24 {
	position: absolute;
	left: 806px;
	top: 575px;
	width: 64px;
	height: 31px;
	z-index: 24;
	}
	#apDiv25 {
	position: absolute;
	left: 878px;
	top: 578px;
	width: 64px;
	height: 32px;
	z-index: 25;
	}
	#apDiv26 {
	position: absolute;
	left: 591px;
	top: 605px;
	width: 64px;
	height: 20px;
	z-index: 26;
	}
	#apDiv27 {
	position: absolute;
	left: 663px;
	top: 602px;
	width: 64px;
	height: 19px;
	z-index: 27;
	}
	#apDiv28 {
	position: absolute;
	left: 733px;
	top: 606px;
	width: 64px;
	height: 18px;
	z-index: 28;
	}
	#apDiv29 {
	position: absolute;
	left: 806px;
	top: 606px;
	width: 64px;
	height: 18px;
	z-index: 29;
	}
	#apDiv30 {
	position: absolute;
	left: 878px;
	top: 605px;
	width: 64px;
	height: 18px;
	z-index: 30;
	}
	#apDiv31 {
		position: absolute;
		left: 591px;
		top: 637px;
		width: 64px;
		height: 31px;
		z-index: 31;
	}
	#apDiv32 {
		position: absolute;
		left: 663px;
		top: 637px;
		width: 64px;
		height: 31px;
		z-index: 32;
	}
	#apDiv33 {
		position: absolute;
		left: 733px;
		top: 637px;
		width: 64px;
		height: 32px;
		z-index: 33;
	}
	#apDiv34 {
	position: absolute;
	left: 806px;
	top: 635px;
	width: 64px;
	height: 32px;
	z-index: 34;
	}
	#apDiv35 {
	position: absolute;
	left: 878px;
	top: 637px;
	width: 64px;
	height: 33px;
	z-index: 35;
	}
	#apDiv36 {
	position: absolute;
	left: 591px;
	top: 665px;
	width: 64px;
	height: 17px;
	z-index: 36;
	}
	#apDiv37 {
	position: absolute;
	left: 663px;
	top: 664px;
	width: 64px;
	height: 20px;
	z-index: 37;
	}
	#apDiv38 {
	position: absolute;
	left: 733px;
	top: 665px;
	width: 64px;
	height: 18px;
	z-index: 38;
	}
	#apDiv39 {
	position: absolute;
	left: 806px;
	top: 660px;
	width: 64px;
	height: 20px;
	z-index: 39;
	}
	#apDiv40 {
	position: absolute;
	left: 878px;
	top: 665px;
	width: 64px;
	height: 18px;
	z-index: 40;
	}
	#apDiv41 {
	position: absolute;
	left: 591px;
	top: 686px;
	width: 64px;
	height: 17px;
	z-index: 41;
	}
	#apDiv42 {
	position: absolute;
	left: 663px;
	top: 687px;
	width: 64px;
	height: 16px;
	z-index: 42;
	}
	#apDiv43 {
	position: absolute;
	left: 733px;
	top: 687px;
	width: 64px;
	height: 16px;
	z-index: 43;
	}
	#apDiv44 {
	position: absolute;
	left: 806px;
	top: 684px;
	width: 64px;
	height: 17px;
	z-index: 44;
	}
	#apDiv45 {
	position: absolute;
	left: 878px;
	top: 687px;
	width: 64px;
	height: 16px;
	z-index: 45;
	}
	#apDiv46 {
		position: absolute;
		left: 591px;
		top: 719px;
		width: 64px;
		height: 29px;
		z-index: 46;
	}
	#apDiv47 {
	position: absolute;
	left: 663px;
	top: 716px;
	width: 64px;
	height: 30px;
	z-index: 47;
	}
	#apDiv48 {
		position: absolute;
		left: 733px;
		top: 719px;
		width: 64px;
		height: 29px;
		z-index: 48;
	}
	#apDiv49 {
	position: absolute;
	left: 806px;
	top: 719px;
	width: 64px;
	height: 29px;
	z-index: 49;
	}
	#apDiv50 {
	position: absolute;
	left: 878px;
	top: 720px;
	width: 64px;
	height: 26px;
	z-index: 50;
	}
	#apDiv51 {
		position: absolute;
		left: 591px;
		top: 758px;
		width: 64px;
		height: 29px;
		z-index: 51;
	}
	#apDiv52 {
	position: absolute;
	left: 663px;
	top: 757px;
	width: 64px;
	height: 29px;
	z-index: 52;
	}
	#apDiv53 {
		position: absolute;
		left: 733px;
		top: 759px;
		width: 64px;
		height: 28px;
		z-index: 53;
	}
	#apDiv54 {
		position: absolute;
		left: 806px;
		top: 759px;
		width: 64px;
		height: 27px;
		z-index: 54;
	}
	#apDiv55 {
	position: absolute;
	left: 878px;
	top: 760px;
	width: 64px;
	height: 28px;
	z-index: 55;
	}
	#apDiv56 {
		position: absolute;
		left: 591px;
		top: 800px;
		width: 64px;
		height: 42px;
		z-index: 56;
	}
	#apDiv57 {
		position: absolute;
		left: 663px;
		top: 802px;
		width: 64px;
		height: 39px;
		z-index: 57;
	}
	#apDiv58 {
		position: absolute;
		left: 733px;
		top: 801px;
		width: 64px;
		height: 39px;
		z-index: 58;
	}
	#apDiv59 {
		position: absolute;
		left: 806px;
		top: 803px;
		width: 64px;
		height: 37px;
		z-index: 59;
	}
	#apDiv60 {
	position: absolute;
	left: 878px;
	top: 801px;
	width: 64px;
	height: 40px;
	z-index: 60;
	}
	#apDiv61 {
		position: absolute;
		left: 591px;
		top: 852px;
		width: 64px;
		height: 35px;
		z-index: 61;
	}
	#apDiv62 {
	position: absolute;
	left: 663px;
	top: 853px;
	width: 64px;
	height: 35px;
	z-index: 62;
	}
	#apDiv63 {
		position: absolute;
		left: 733px;
		top: 856px;
		width: 64px;
		height: 32px;
		z-index: 63;
	}
	#apDiv64 {
		position: absolute;
		left: 806px;
		top: 856px;
		width: 64px;
		height: 32px;
		z-index: 64;
	}
	#apDiv65 {
		position: absolute;
		left: 878px;
		top: 855px;
		width: 64px;
		height: 34px;
		z-index: 65;
	}
	#apDiv66 {
		position: absolute;
		left: 591px;
		top: 896px;
		width: 64px;
		height: 32px;
		z-index: 66;
	}
	#apDiv67 {
		position: absolute;
		left: 733px;
		top: 898px;
		width: 64px;
		height: 30px;
		z-index: 67;
	}
	#apDiv68 {
		position: absolute;
		left: 663px;
		top: 899px;
		width: 64px;
		height: 28px;
		z-index: 67;
	}
	#apDiv69 {
		position: absolute;
		left: 806px;
		top: 899px;
		width: 64px;
		height: 28px;
		z-index: 68;
	}
	#apDiv70 {
	position: absolute;
	left: 878px;
	top: 899px;
	width: 64px;
	height: 28px;
	z-index: 69;
	}
	#apDiv71 {
		position: absolute;
		left: 592px;
		top: 936px;
		width: 64px;
		height: 30px;
		z-index: 70;
	}
	#apDiv72 {
	position: absolute;
	left: 663px;
	top: 932px;
	width: 64px;
	height: 27px;
	z-index: 71;
	}
	#apDiv73 {
		position: absolute;
		left: 733px;
		top: 936px;
		width: 64px;
		height: 31px;
		z-index: 72;
	}
	#apDiv74 {
		position: absolute;
		left: 806px;
		top: 937px;
		width: 64px;
		height: 30px;
		z-index: 73;
	}
	#apDiv75 {
	position: absolute;
	left: 878px;
	top: 937px;
	width: 64px;
	height: 30px;
	z-index: 74;
	}
	#apDiv76 {
		position: absolute;
		left: 591px;
		top: 973px;
		width: 64px;
		height: 28px;
		z-index: 75;
	}
	#apDiv77 {
	position: absolute;
	left: 663px;
	top: 970px;
	width: 64px;
	height: 31px;
	z-index: 76;
	}
	#apDiv78 {
		position: absolute;
		left: 733px;
		top: 973px;
		width: 64px;
		height: 30px;
		z-index: 77;
	}
	#apDiv79 {
		position: absolute;
		left: 806px;
		top: 972px;
		width: 64px;
		height: 31px;
		z-index: 78;
	}
	#apDiv80 {
	position: absolute;
	left: 878px;
	top: 976px;
	width: 64px;
	height: 27px;
	z-index: 79;
	}
	#apDiv81 {
	position: absolute;
	left: 318px;
	top: 1035px;
	width: 64px;
	height: 23px;
	z-index: 80;
	}
	#apDiv82 {
	position: absolute;
	left: 363px;
	top: 1035px;
	width: 64px;
	height: 25px;
	z-index: 81;
	}
#apDiv83 {
	position: absolute;
	left: 174px;
	top: 1126px;
	width: 290px;
	height: 27px;
	z-index: 82;
}
#apDiv84 {
	position: absolute;
	left: 174px;
	top: 1161px;
	width: 292px;
	height: 21px;
	z-index: 83;
}
#apDiv85 {
	position: absolute;
	left: 256px;
	top: 1190px;
	width: 192px;
	height: 24px;
	z-index: 84;
}
#apDiv86 {
	position: absolute;
	left: 174px;
	top: 1220px;
	width: 293px;
	height: 27px;
	z-index: 85;
}
#apDiv87 {
	position: absolute;
	left: 174px;
	top: 1251px;
	width: 293px;
	height: 24px;
	z-index: 86;
}
#apDiv88 {
	position: absolute;
	left: 683px;
	top: 1126px;
	width: 260px;
	height: 27px;
	z-index: 87;
}
#apDiv89 {
	position: absolute;
	left: 555px;
	top: 1179px;
	width: 383px;
	height: 25px;
	z-index: 88;
}
#apDiv90 {
	position: absolute;
	left: 750px;
	top: 1251px;
	width: 192px;
	height: 25px;
	z-index: 89;
}
</style>
<script src="../../../bower_components/angular/angular.js"></script>
<script src="../../../bower_components/jquery/dist/jquery.js"></script>
<script src="../../../scripts/controllers/consultaafiliados/soportes/satisfaccioncontroller.js"></script>
</head>

<body ng-controller="satisfaccioncontroller">
<div id="apDiv1"><center>{{info["0"].RES1}}</center></div>
<div id="apDiv2"><center>{{info["0"].RES2}}</center></div>
<div id="apDiv3"><center>{{info["0"].RES3}}</center></div>
<div id="apDiv4"><center>{{info["0"].RES4}}</center></div>
<div id="apDiv5"><center>{{info["0"].RES5}}</center></div>
<div id="apDiv6"><center>{{info["1"].RES1}}</center></div>
<div id="apDiv7"><center>{{info["1"].RES2}}</center></div>
<div id="apDiv8"><center>{{info["1"].RES3}}</center></div>
<div id="apDiv9"><center>{{info["1"].RES4}}</center></div>
<div id="apDiv10"><center>{{info["1"].RES5}}</center></div>
<div id="apDiv11"><center>{{info["2"].RES1}}</center></div>
<div id="apDiv12"><center>{{info["2"].RES2}}</center></div>
<div id="apDiv13"><center>{{info["2"].RES3}}</center></div>
<div id="apDiv14"><center>{{info["2"].RES4}}</center></div>
<div id="apDiv15"><center>{{info["2"].RES5}}</center></div>
<div id="apDiv16"><center>{{info["3"].RES1}}</center></div>
<div id="apDiv17"><center>{{info["3"].RES2}}</center></div>
<div id="apDiv18"><center>{{info["3"].RES3}}</center></div>
<div id="apDiv19"><center>{{info["3"].RES4}}</center></div>
<div id="apDiv20"><center>{{info["3"].RES5}}</center></div>
<div id="apDiv21"><center>{{info["4"].RES1}}</center></div>
<div id="apDiv22"><center>{{info["4"].RES2}}</center></div>
<div id="apDiv23"><center>{{info["4"].RES3}}</center></div>
<div id="apDiv24"><center>{{info["4"].RES4}}</center></div>
<div id="apDiv25"><center>{{info["4"].RES5}}</center></div>
<div id="apDiv26"><center>{{info["5"].RES1}}</center></div>
<div id="apDiv27"><center>{{info["5"].RES2}}</center></div>
<div id="apDiv28"><center>{{info["5"].RES3}}</center></div>
<div id="apDiv29"><center>{{info["5"].RES4}}</center></div>
<div id="apDiv30"><center>{{info["5"].RES5}}</center></div>
<div id="apDiv31"><center>{{info["6"].RES1}}</center></div>
<div id="apDiv32"><center>{{info["6"].RES2}}</center></div>
<div id="apDiv33"><center>{{info["6"].RES3}}</center></div>
<div id="apDiv34"><center>{{info["6"].RES4}}</center></div>
<div id="apDiv35"><center>{{info["6"].RES5}}</center></div>
<div id="apDiv36"><center>{{info["7"].RES1}}</center></div>
<div id="apDiv37"><center>{{info["7"].RES2}}</center></div>
<div id="apDiv38"><center>{{info["7"].RES3}}</center></div>
<div id="apDiv39"><center>{{info["7"].RES4}}</center></div>
<div id="apDiv40"><center>{{info["7"].RES5}}</center></div>
<div id="apDiv41"><center>{{info["8"].RES1}}</center></div>
<div id="apDiv42"><center>{{info["8"].RES2}}</center></div>
<div id="apDiv43"><center>{{info["8"].RES3}}</center></div>
<div id="apDiv44"><center>{{info["8"].RES4}}</center></div>
<div id="apDiv45"><center>{{info["8"].RES5}}</center></div>
<div id="apDiv46"><center>{{info["9"].RES1}}</center></div>
<div id="apDiv47"><center>{{info["9"].RES2}}</center></div>
<div id="apDiv48"><center>{{info["9"].RES3}}</center></div>
<div id="apDiv49"><center>{{info["9"].RES4}}</center></div>
<div id="apDiv50"><center>{{info["9"].RES5}}</center></div>
<div id="apDiv51"><center>{{info["10"].RES1}}</center></div>
<div id="apDiv52"><center>{{info["10"].RES2}}</center></div>
<div id="apDiv53"><center>{{info["10"].RES3}}</center></div>
<div id="apDiv54"><center>{{info["10"].RES4}}</center></div>
<div id="apDiv55"><center>{{info["10"].RES5}}</center></div>
<div id="apDiv56"><center>{{info["11"].RES1}}</center></div>
<div id="apDiv57"><center>{{info["11"].RES2}}</center></div>
<div id="apDiv58"><center>{{info["11"].RES3}}</center></div>
<div id="apDiv59"><center>{{info["11"].RES4}}</center></div>
<div id="apDiv60"><center>{{info["11"].RES5}}</center></div>
<div id="apDiv61"><center>{{info["12"].RES1}}</center></div>
<div id="apDiv62"><center>{{info["12"].RES2}}</center></div>
<div id="apDiv63"><center>{{info["12"].RES3}}</center></div>
<div id="apDiv64"><center>{{info["12"].RES4}}</center></div>
<div id="apDiv65"><center>{{info["12"].RES5}}</center></div>
<div id="apDiv66"><center>{{info["13"].RES1}}</center></div>
<div id="apDiv68"><center>{{info["13"].RES2}}</center></div>
<div id="apDiv67"><center>{{info["13"].RES3}}</center></div>
<div id="apDiv69"><center>{{info["13"].RES4}}</center></div>
<div id="apDiv70"><center>{{info["13"].RES5}}</center></div>
<div id="apDiv71"><center>{{info["14"].RES1}}</center></div>
<div id="apDiv72"><center>{{info["14"].RES2}}</center></div>
<div id="apDiv73"><center>{{info["14"].RES3}}</center></div>
<div id="apDiv74"><center>{{info["14"].RES4}}</center></div>
<div id="apDiv75"><center>{{info["14"].RES5}}</center></div>
<div id="apDiv76"><center>{{info["15"].RES1}}</center></div>
<div id="apDiv77"><center>{{info["15"].RES2}}</center></div>
<div id="apDiv78"><center>{{info["15"].RES3}}</center></div>
<div id="apDiv79"><center>{{info["15"].RES4}}</center></div>
<div id="apDiv80"><center>{{info["15"].RES5}}</center></div>
<div id="apDiv81">{{recomienda}}</div>
<div id="apDiv82">{{norecomienda}}</div>
<div id="apDiv83">{{det["0"].FECHAENCUESTA}}</div>
<div id="apDiv84">{{det["0"].NOMBRE}}</div>
<div id="apDiv85">{{det["0"].DOCUMENTO}}</div>
<div id="apDiv86">{{det["0"].TELEFONO}}</div>
<div id="apDiv87">{{det["0"].DIRECCION}}</div>
<div id="apDiv88">{{det["0"].MUNICIPIO}}</div>
<div id="apDiv89">{{det["0"].IPS}}</div>
<div id="apDiv90">{{useracplica}}</div>
<br><br><br><br>
<img src="encuesta_satisfaccion.jpg">
</body>
</html>