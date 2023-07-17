<?php 
  session_start();
  if (!isset($_SESSION['nombre'])) {
      header("Location: ../../../index.html");
  }
?>
<!doctype html>
<html ng-app="GenesisApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Formulario Único de Afiliación</title>
<link rel="icon" href="../../../assets/images/icon.ico" />
<link rel="stylesheet" href="../../../assets/css/fuar.css">
<style type="text/css">
  #numero_doc {
    position: absolute;
    left: 32px;
    top: 15px;
    width: 213px;
    height: 18px;
    z-index: 10;
  }
  #municipio_nombre {
    position: absolute;
    left: 22px;
    top: 2px;
    width: 175px;
    height: 13px;
    z-index: 1;
  }
  #departamento_nombre {
    position: absolute;
    left: 734px;
    top: 425px;
    width: 136px;
    height: 13px;
    z-index: 1;
  }
  #con_primerapellido {
    position: absolute;
    left: 30px;
    top: 496px;
    width: 203px;
    height: 22px;
    z-index: 1;
  }
  #con_segundoapellido {
    position: absolute;
    left: 258px;
    top: 496px;
    width: 219px;
    height: 21px;
    z-index: 2;
  }
  #con_primernombre {
    position: absolute;
    left: 484px;
    top: 496px;
    width: 211px;
    height: 19px;
    z-index: 3;
  }
  #con_segundonombre {
    position: absolute;
    left: 701px;
    top: 496px;
    width: 207px;
    height: 17px;
    z-index: 4;
  }
  #con_fecha_nacimiento {
    position: absolute;
    left: 695px;
    top: 545px;
    width: 202px;
    height: 16px;
    z-index: 1;
  }
#apDiv1 {
	position: absolute;
	left: 28px;
	top: 1430px;
	width: 17px;
	height: 14px;
	z-index: 1;
}
#apDiv2 {
	position: absolute;
	left: 28px;
	top: 1447px;
	width: 17px;
	height: 17px;
	z-index: 2;
}
#apDiv3 {
	position: absolute;
	left: 28px;
	top: 1468px;
	width: 18px;
	height: 16px;
	z-index: 3;
}
#apDiv4 {
	position: absolute;
	left: 28px;
	top: 1488px;
	width: 18px;
	height: 15px;
	z-index: 4;
}
#apDiv5 {
	position: absolute;
	left: 28px;
	top: 1508px;
	width: 18px;
	height: 15px;
	z-index: 5;
}
#CodigoRet {
  position: absolute;
  left: 38px;
  top: 1508px;
  width: 18px;
  height: 15px;
  z-index: 5;
}
#apDiv6 {
	position: absolute;
	left: 28px;
	top: 1546px;
	width: 18px;
	height: 16px;
	z-index: 6;
}
#apDiv7 {
	position: absolute;
	left: 28px;
	top: 1566px;
	width: 18px;
	height: 15px;
	z-index: 7;
}
#apDiv8 {
	position: absolute;
	left: 28px;
	top: 1585px;
	width: 18px;
	height: 16px;
	z-index: 8;
}
#apDiv9 {
	position: absolute;
	left: 464px;
	top: 1471px;
	width: 18px;
	height: 17px;
	z-index: 9;
}
#apDiv10 {
	position: absolute;
	left: 464px;
	top: 1513px;
	width: 19px;
	height: 16px;
	z-index: 10;
}
#traa {
  position: absolute;
  left: 564px;
  top: 1513px;
  width: 19px;
  height: 16px;
  z-index: 10;
}
#apDiv11 {
	position: absolute;
	left: 464px;
	top: 1554px;
	width: 18px;
	height: 17px;
	z-index: 11;
}
#apDiv12 {
	position: absolute;
	left: 21px;
	top: 1698px;
	width: 204px;
	height: 20px;
	z-index: 12;
}
#apDiv13 {
	position: absolute;
	left: 230px;
	top: 1698px;
	width: 241px;
	height: 21px;
	z-index: 13;
}
#apDiv14 {
	position: absolute;
	left: 479px;
	top: 1695px;
	width: 219px;
	height: 24px;
	z-index: 14;
}
#apDiv15 {
	position: absolute;
	left: 707px;
	top: 1694px;
	width: 202px;
	height: 25px;
	z-index: 15;
}
#apDiv16 {
	position: absolute;
	left: 112px;
	top: 1752px;
	width: 32px;
	height: 14px;
	z-index: 16;
}
#apDiv17 {
	position: absolute;
	left: 172px;
	top: 1736px;
	width: 180px;
	height: 18px;
	z-index: 17;
}
#apDiv18 {
	position: absolute;
	left: 464px;
	top: 1751px;
	width: 18px;
	height: 15px;
	z-index: 18;
}
#apDiv19 {
	position: absolute;
	left: 548px;
	top: 1750px;
	width: 18px;
	height: 16px;
	z-index: 19;
}
#apDiv20 {
	position: absolute;
	left: 597px;
	top: 1750px;
	width: 17px;
	height: 18px;
	z-index: 20;
}
#apDiv21 {
	position: absolute;
	left: 616px;
	top: 1752px;
	width: 17px;
	height: 16px;
	z-index: 21;
}
#apDiv22 {
	position: absolute;
	left: 635px;
	top: 1752px;
	width: 15px;
	height: 15px;
	z-index: 22;
}
#apDiv23 {
	position: absolute;
	left: 652px;
	top: 1752px;
	width: 14px;
	height: 15px;
	z-index: 23;
}
#apDiv24 {
	position: absolute;
	left: 668px;
	top: 1751px;
	width: 17px;
	height: 16px;
	z-index: 24;
}
#apDiv25 {
	position: absolute;
	left: 687px;
	top: 1752px;
	width: 15px;
	height: 14px;
	z-index: 25;
}
#apDiv26 {
	position: absolute;
	left: 704px;
	top: 1752px;
	width: 14px;
	height: 15px;
	z-index: 26;
}
#apDiv27 {
	position: absolute;
	left: 720px;
	top: 1752px;
	width: 16px;
	height: 15px;
	z-index: 27;
}
#apDiv28 {
	position: absolute;
	left: 294px;
	top: 2168px;
	width: 18px;
	height: 15px;
	z-index: 28;
}
#apDiv29 {
	position: absolute;
	left: 327px;
	top: 2168px;
	width: 19px;
	height: 14px;
	z-index: 29;
}
#apDiv30 {
	position: absolute;
	left: 360px;
	top: 2167px;
	width: 18px;
	height: 17px;
	z-index: 30;
}
#apDiv31 {
	position: absolute;
	left: 392px;
	top: 2166px;
	width: 19px;
	height: 16px;
	z-index: 31;
}
#apDiv32 {
	position: absolute;
	left: 425px;
	top: 2166px;
	width: 19px;
	height: 18px;
	z-index: 32;
}
#apDiv33 {
	position: absolute;
	left: 458px;
	top: 2167px;
	width: 18px;
	height: 15px;
	z-index: 33;
}
#apDiv34 {
	position: absolute;
	left: 491px;
	top: 2168px;
	width: 17px;
	height: 14px;
	z-index: 34;
}
#apDiv35 {
	position: absolute;
	left: 524px;
	top: 2167px;
	width: 18px;
	height: 15px;
	z-index: 35;
}
#apDiv36 {
	position: absolute;
	left: 26px;
	top: 2150px;
	width: 18px;
	height: 15px;
	z-index: 36;
}
#apDiv37 {
	position: absolute;
	left: 484px;
	top: 476px;
	width: 212px;
	height: 18px;
	z-index: 37;
}
</style>
<script src="../../../bower_components/angular/angular.js"></script>
<script src="../../../bower_components/jquery/dist/jquery.js"></script>
<script src="../../../scripts/controllers/consultaafiliados/soportes/fuarcontroller.js"></script>
<script src="../../../scripts/const/const.js"></script>
<script type="text/javascript" src="../../../js/ngStorage.js"></script>
</head>


<body ng-controller="fuarcontroller" id="test" ng-cloak>  

<div id="fuar">
<strong>FORMULARIO ÚNICO DE AFILIACIÓN Y REGISTRO DE NOVEDADES AL SGSSS </strong></div>
<div id="content">
    <div id="radicado"><center>{{ radicado }}</center></div>
    <div id="textradicado">
      <strong>No. de Radicación</strong>
    </div>
    <div id="textfechar">
      <strong>Fecha de Radicación</strong>
    </div>
    <div id="fecharadicacion"><center>{{ fecha_radicado }}</center></div>
  <div id="instrucciones"><strong>(Lea las instrucciones que se encuentran anexas al formulario antes de diligenciarlo)</strong></div>
  <center>
      <div id="logo">
          <img src="Logo-Cajacopi-OK.png" width="98" height="65" id="logoimg"/>
        </div>
  </center>
  <div id="secc">I. DATOS DEL TRÁMITE</div>
  <div id="secc1">
    1.Tipo de Trámite
    <div id="a1">A. Afiliación</div>
    <div id="checka1"><center><strong>{{check_afiliacion}}</strong></center></div>
    <div id="b1">B. Reporte de novedades</div>
    <div id="checkb1"><center><strong>{{check_novedad}}</strong></center></div>
  </div>
  <div id="secc2">
    2. Tipo de Afiliación
    <div id="b2">B. Colectiva</div>
    <div id="checkb2"></div>
    <div id="a2">A. Individual</div>
    <div id="CF2">- Cotizante o Cabeza de Familia</div>
    <div id="checkCF2"><center><strong>X</strong></center></div>
  <div id="AA2">- Beneficiario o afiliado adicional</div>
    <div id="checkAA2"><strong><center>{{ check_ben_adic }}</center></strong></div>
  <div id="c2">D. De oficio</div>
    <div id="checkc2"></div>
  <div id="d2">C. Institucional</div>
    <div id="checkd2"></div>
  </div>
  <div id="secc3">
    3. Régimen
    <div id="a3">A. Contributivo</div>
    <div id="checka3"></div>
  <div id="b3">B. Subsidiado</div>
    <div id="checkb3"><center><strong>X</strong></center></div>
  </div>
  <div id="secc4">
    4. Tipo de afiliado
    <div id="a4">A. Cotizante</div>
    <div id="checka4"></div>
    <div id="b4">B. Cabeza de Familia</div>
    <div id="checkb4"><center><strong>{{cabeza}}</strong></center></div>
    <div id="c4">C. Beneficiario</div>
    <div id="checkc4"><center><strong>{{beneficiario}}</strong></center></div>
  </div>
  <div id="secc5">
    5. Tipo de cotizante
    <div id="a5">A. Dependiente</div>
    <div id="checka5"></div>
    <div id="b5">B. Independiente</div>
    <div id="checkb5"></div>
    <div id="c5">C. Pensionado</div>
    <div id="checkc5"></div>
  </div>
  <div id="codigoeps">Código<br />
    <div style="font-size:10px;">
      (a registrar por la EPS)
    </div>
    <div id="checkepscode"><center><strong>CCF055</strong></center></div>
  </div>
  <div id="seccA">
    <center><strong><div style="font-size: 15px;">A. AFILIACIÓN</div></strong></center>
    <div id="ii">
      <strong>II. DATOS BÁSICOS DE IDENTIFICACIÓN (del cotizante o cabeza de familia)</strong>
    </div>
  </div>
  <div id="secc6">
    6. Apellidos y Nombres
    <div id="primer_apellido">
      <center>Primer apellido</center>
    </div>
   <div id="segundo_apellido">
        <center>Segundo apellido</center>
    </div>
    <div id="primer_nombre">
      <center>Primer nombre</center>
    </div>
    <div id="segundo_nombre">
      <center>Segundo nombre</center>
    </div>
  </div>
  <div id="secc7">
    7. Tipo de documento de identidad
    <div id="checktipo_doc"><center><strong>{{ tipo_documento }}</strong></center></div>
  </div>
  <div id="secc8">
    8. Número del documento de identidad
  </div>
  <div id="secc9">
    9. Sexo
    <div id="femenino">Femenino</div>
    <div id="checkfem"><center><strong>{{ sexo_femenino }}</center></strong></div>
    <div id="masculino">Masculino</div>
    <div id="checkmas"><center><strong>{{ sexo_masculino }}</center></strong></div>
  </div>
  <div id="secc10">
    10. Fecha de nacimiento
  </div>
  <div id="iii">
    <strong>
    III. DATOS COMPLEMENTARIOS<br />
    </strong>
    Datos personales
  </div>
  <div id="secc11">
    11. Etnia
    <div id="check11"><center><strong>{{ etnia }}</strong></center></div>
  </div>
  <div id="secc12">
  12. Discapacidad
    <div id="discapacidad">Tipo</div>
  <div id="tipo_discapacidad"><center><strong>{{discapacidad}}</strong></center></div>
    <div id="condicion">Condición</div>
  <div id="tipo_condicion"><center><strong>{{condicion}}</strong></center></div>
  </div>
  <div id="secc13">
  13. Puntaje SISBEN
    <div id="sisben"><center><strong>{{sisben}}</strong></center></div>
  </div>
  <div id="secc14">
    14. Grupo de población especial
    <div id="gpoblacional"><center><strong>{{g_poblacional}}</strong></center></div>
  </div>
  <div id="secc15">
    15. Administradora de Riesgos Laborales - ARL
  </div>
  <div id="secc16">
    16. Administradora de pensiones
  </div>
  <div id="secc17">
    17. Ingreso de base de cotizante - IBC
  </div>
  <div id="secc18">
    18. Residencia<br /><br />
    <center>Dirección</center>
  </div>
  <div id="fijo">
    <br /><br /><center>Teléfono Fijo</center>
  </div>
  <div id="celular">
    <br /><br /><center>Teléfono Celular</center>
  </div>
  <div id="email">
    <br /><br /><center>Correo Electrónico</center>
  </div>
  <div id="muni">
  <div id="municipio_nombre"><center><strong>{{municipio}}</div>
    <br />  
  <center>Municipio/Distrito</center></div>
  <div id="localidad">
    <br />
    <center>Localidad / Comuna</center>
  </div>
  <div id="iv">
  <strong>IV. DATOS DE IDENTIFICACIÓN DE LOS MIEMBROS DEL NÚCLEO FAMILIAR</strong>
      <br />
      Datos básicos de identificación del cónyuge o compañero(a) permanente cotizante
  </div>
  <div id="secc19">
    19. Apellidos y nombres<br />
    <div style="padding-top: 20px; 
          text-align: center;">Primer apellido
    </div>
    <div id="seg_apellido">
      <center>Segundo apellido</center>
    </div>
  </div>
  <div id="pri_nombre">
    <center>Primer nombre</center>
  </div>
  <div id="seg_nombre">
    <center>Segundo nombre</center>
  </div>
  <div id="secc20">
    20. Tipo de documento de identidad
    <div id="check20"><strong><center>{{ con_tipodocumento }}</center></strong></div>
  </div>
  <div id="secc21">
    21. Número de documento de identidad
    <div id="numero_doc"><center><strong>{{ com_numerodocumento }}</strong></center></div>
  </div>
  <div id="secc22">
      22. Sexo
      <div id="fem_iv">Femenino</div>
      <div id="checkfem_iv"><center><strong>{{ check_con_sexof}}</strong></center></div>
      <div id="mas_iv">Masculino</div>
      <div id="checkmas_iv"><center><strong>{{ check_con_sexom}}</strong></center></div>
    </div>
  <div id="secc23">
      23. Fecha de nacimiento
  </div>
  <div id="bensecc">Datos básicos de identificación de los beneficiarios y de los afiliados adicionales</div>
  <div id="secc24">
  &nbsp;24. Apellidos y nombres
  <table width="902" border="1">
  <tr>
    <th width="15" scope="col"></th>
    <th width="222" scope="col">Primer apellido</th>
    <th width="219" scope="col">Segundo apellido</th>
    <th width="194" scope="col">Primer nombre</th>
    <th width="218" scope="col">Segundo nombre</th>
  </tr>
  <tr>
    <td><strong>B1</strong></td>
    <td><center>{{ b1_primer_apellido }}</center></td>
    <td><center>{{ b1_segundo_apellido }}</center></td>
    <td><center>{{ b1_primer_nombre }}</center></td>
    <td><center>{{ b1_segundo_nombre }}</center></td>
  </tr>
  <tr>
    <td><strong>B2</strong></td>
    <td><center>{{ b2_primer_apellido }}</center></td>
    <td><center>{{ b2_segundo_apellido }}</center></td>
    <td><center>{{ b2_primer_nombre }}</center></td>
    <td><center>{{ b2_segundo_nombre }}</center>
  </tr>
  <tr>
    <td><strong>B3</strong></td>
    <td><center>{{ b3_primer_apellido }}</center></td>
    <td><center>{{ b3_segundo_apellido }}</center></td>
    <td><center>{{ b3_primer_nombre }}</center></td>
    <td><center>{{ b3_segundo_nombre }}</center>
  </tr>
  <tr>
    <td><strong>B4</strong></td>
    <td><center>{{ b4_primer_apellido }}</center></td>
    <td><center>{{ b4_segundo_apellido }}</center></td>
    <td><center>{{ b4_primer_nombre }}</center></td>
    <td><center>{{ b4_segundo_nombre }}</center>
  </tr>
  <tr>
    <td><strong>B5</strong></td>
    <td><center>{{ b5_primer_apellido }}</center></td>
    <td><center>{{ b5_segundo_apellido }}</center></td>
    <td><center>{{ b5_primer_nombre }}</center></td>
    <td><center>{{ b5_segundo_nombre }}</center>
  </tr>
</table>
</div>
  <div id="secc25">
      <table width="902" border="1">
          <tr>
             <th colspan="2" rowspan="2">25. Tipo de documento de identidad</th>
          <th width="218" rowspan="2">26. Número del documento de identidad</th>
          <th colspan="2">27. Sexo</th>
          <th width="217" rowspan="2">28. Fecha de nacimiento</th>
        </tr>
        <tr>
          <th width="92" >Femenino</th>
          <th width="99" >Masculino</th>
        </tr>
        <tr>
          <td width="15" ><strong>B1</strong></td>
            <td width="221"><center>{{ b1_tipo_documento }}</center></td>
          <td><center>{{ b1_numero_documento }}</center></td>
          <td><center>{{ b1_sexo_femenino }}</center></td>
          <td><center>{{ b1_sexo_masculino }}</center></td>
          <td><center>{{ b1_fecha_nacimiento }}</center></td>
        </tr>
        <tr>
          <td><strong>B2</strong></td>
            <td><center>{{ b2_tipo_documento }}</center></td>
          <td><center>{{ b2_numero_documento }}</center></td>
          <td><center>{{ b2_sexo_femenino }}</center></td>
          <td><center>{{ b2_sexo_masculino }}</center></td>
          <td><center>{{ b2_fecha_nacimiento }}</center></td>
        </tr>
        <tr>
          <td><strong>B3</strong></td>
          <td><center>{{ b3_tipo_documento }}</center></td>
          <td><center>{{ b3_numero_documento }}</center></td>
          <td><center>{{ b3_sexo_femenino }}</center></td>
          <td><center>{{ b3_sexo_masculino }}</center></td>
          <td><center>{{ b3_fecha_nacimiento }}</center></td>
        </tr>
        <tr>
          <td><strong>B4</strong></td>
          <td><center>{{ b4_tipo_documento }}</center></td>
          <td><center>{{ b4_numero_documento }}</center></td>
          <td><center>{{ b4_sexo_femenino }}</center></td>
          <td><center>{{ b4_sexo_masculino }}</center></td>
          <td><center>{{ b4_fecha_nacimiento }}</center></td>
        </tr>
        <tr>
          <td><strong>B5</strong></td>
          <td><center>{{ b5_tipo_documento }}</center></td>
          <td><center>{{ b5_numero_documento }}</center></td>
          <td><center>{{ b5_sexo_femenino }}</center></td>
          <td><center>{{ b5_sexo_masculino }}</center></td>
          <td><center>{{ b5_fecha_nacimiento }}</center></td>
        </tr>
      </table>
    </div>
  <div id="seccdc"><strong>Datos complementarios</strong><br />
    <table width="902" border="1">
      <tr>
            <th colspan="2" rowspan="2" >29. Parentesco</th>
            <th width="218" rowspan="2">30. Etnia</th>
            <th colspan="3">31. Discapacidad - Tipo</th>
            <th colspan="2">Condición</th>
      </tr>
      <tr>
        <th width="69" scope="col">F</th>
        <th width="55" scope="col">N</th>
        <th width="62" scope="col">M</th>
        <th width="95" scope="col">T</th>
        <th width="117" scope="col">P</th>
      </tr>
      <tr>
        <td width="13"><strong>B1</strong></td>
        <td width="221"><center>{{b1_parentesco}}</center></td>
        <td><center>{{b1_etnia}}</center></td>
        <td><center>{{b1_discapacidad_f}}</center></td>
        <td><center>{{b1_discapacidad_n}}</center></td>
        <td><center>{{b1_discapacidad_m}}</center></td>
        <td><center>{{b1_condicion_t}}</center></td>
        <td><center>{{b1_condicion_p}}</center></td>
      </tr>
      <tr>
        <td><strong>B2</strong></td>
        <td><center>{{b2_parentesco}}</center></td>
        <td><center>{{b2_etnia}}</center></td>
        <td><center>{{b2_discapacidad_f}}</center></td>
        <td><center>{{b2_discapacidad_n}}</center></td>
        <td><center>{{b2_discapacidad_m}}</center></td>
        <td><center>{{b2_condicion_t}}</center></td>
        <td><center>{{b2_condicion_p}}</center></td>
      </tr>
      <tr>
        <td><strong>B3</strong></td>
        <td><center>{{b3_parentesco}}</center></td>
        <td><center>{{b3_etnia}}</center></td>
        <td><center>{{b3_discapacidad_f}}</center></td>
        <td><center>{{b3_discapacidad_n}}</center></td>
        <td><center>{{b3_discapacidad_m}}</center></td>
        <td><center>{{b3_condicion_t}}</center></td>
        <td><center>{{b3_condicion_p}}</center></td>
      </tr>
      <tr>
        <td><strong>B4</strong></td>
        <td><center>{{b4_parentesco}}</center></td>
        <td><center>{{b4_etnia}}</center></td>
        <td><center>{{b4_discapacidad_f}}</center></td>
        <td><center>{{b4_discapacidad_n}}</center></td>
        <td><center>{{b4_discapacidad_m}}</center></td>
        <td><center>{{b4_condicion_t}}</center></td>
        <td><center>{{b4_condicion_p}}</center></td>
      </tr>
      <tr>
        <td><strong>B5</strong></td>
        <td><center>{{b5_parentesco}}</center></td>
        <td><center>{{b5_etnia}}</center></td>
        <td><center>{{b5_discapacidad_f}}</center></td>
        <td><center>{{b5_discapacidad_n}}</center></td>
        <td><center>{{b5_discapacidad_m}}</center></td>
        <td><center>{{b5_condicion_t}}</center></td>
        <td><center>{{b5_condicion_p}}</center></td>
      </tr>
  </table>
  </div>
  <div id="secc32">
    32. Datos de residencia
    <table width="902" border="1">
  <tr>
    <th width="13" scope="col">&nbsp;</th>
    <th width="202" scope="col">Municipio/Distrito</th>
    <th width="39" scope="col">Urbana</th>
    <th width="39" scope="col">Rural</th>
    <th width="169" scope="col">Departamento</th>
    <th width="189" scope="col">Telefono Fijo y/o Celular</th>
    <th width="205" scope="col">33. Valor de la UPC del afiliado adicional (a registrar por la EPS)</th>
  </tr>
  <tr>
    <td>B1</td>
    <td><center>{{b1_municipio}}</center></td>
    <td><center>{{b1_zona_u}}</center></td>
    <td><center>{{b1_zona_r}}</center></td>
    <td><center>{{b1_departamento}}</center></td>
    <td><center>{{b1_tel_fijo}}&nbsp;-&nbsp;{{b1_tel_celular}}</center></td>
    <td></td>
  </tr>
  <tr>
    <td>B2</td>
    <td><center>{{b2_municipio}}</center></td>
    <td><center>{{b2_zona_u}}</center></td>
    <td><center>{{b2_zona_r}}</center></td>
    <td><center>{{b2_departamento}}</center></td>
    <td><center>{{b2_tel_fijo}}&nbsp;-&nbsp;{{b2_tel_celular}}</center></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>B3</td>
    <td><center>{{b3_municipio}}</center></td>
    <td><center>{{b3_zona_u}}</center></td>
    <td><center>{{b3_zona_r}}</center></td>
    <td><center>{{b3_departamento}}</center></td>
    <td><center>{{b3_tel_fijo}}&nbsp;-&nbsp;{{b3_tel_celular}}</center></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>B4</td>
    <td><center>{{b4_municipio}}</center></td>
    <td><center>{{b4_zona_u}}</center></td>
    <td><center>{{b4_zona_r}}</center></td>
    <td><center>{{b4_departamento}}</center></td>
    <td><center>{{b4_tel_fijo}}&nbsp;-&nbsp;{{b4_tel_celular}}</center></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>B5</td>
    <td><center>{{b5_municipio}}</center></td>
    <td><center>{{b5_zona_u}}</center></td>
    <td><center>{{b5_zona_r}}</center></td>
    <td><center>{{b5_departamento}}</center></td>
    <td><center>{{b5_tel_fijo}}&nbsp;-&nbsp;{{b5_tel_celular}}</center></td>
    <td>&nbsp;</td>
  </tr>
</table>
  </div>
  <div id="ips">
    Selección de la IPS Primaria
  </div>
  <table id="secc34" width="902" border="1">
    <tr>
      <th colspan="3"><div style="float: left;">34. Nombre de la Institución Prestadora de Servicios de Salud</div>&nbsp;</th>
      <th width="206" scope="col">Código de la IPS (a registrar por la EPS)</th>
    </tr>
    <tr>
      <td colspan="2"><center>C</center></td>
      <td width="647">{{c_nombre_ips}}</td>
      <td>{{c_codigo_ips}}</td>
    </tr>
    <tr>
      <td width="7">B1</td>
      <td width="14">&nbsp;</td>
      <td>{{b1_nombre_ips}}</td>
      <td>{{b1_codigo_ips}}</td>
    </tr>
    <tr>
      <td>B2</td>
      <td>&nbsp;</td>
      <td>{{b2_nombre_ips}}</td>
      <td>{{b2_codigo_ips}}</td>
    </tr>
    <tr>
      <td>B3</td>
      <td>&nbsp;</td>
      <td>{{b3_nombre_ips}}</td>
      <td>{{b3_codigo_ips}}</td>
    </tr>
  </table> 
  <div id="seccV"><strong>V. DATOS DE IDENTIFICACIÓN DEL EMPLEADOR Y OTROS APORTANTES O DE LAS ENTIDADES RESPONSABLES DE LA AFILIACIÓN COLECTIVA, INSTITUCIONAL O DE OFICIO</strong></div>
  <div id="secc35">35. Nombre o razón social</div>
  <div id="secc39">39. Ubicación</div>
  <div id="vdire">Dirección</div>
  <div id="vtel">Teléfono</div>
  <div id="vemail">Correo electrónico</div>
  <div id="vmuni">Municipio / Distrito</div>
  <div id="vdepa">Departamento</div>
  <div id="secc36">36. Tipo de documento de identificación</div>
  <div id="secc37">37. Número del documento de identificación</div>
  <div id="secc38">38. Tipo de aportante o pagador pensiones (a registrar por la EPS)</div>
  <div id="tipo_doc_employer"></div>
  <div id="departamento">Departamento</div>
  <div id="zona">Zona</div>
  <div id="urbana">Urbana</div>
  <div id="rural">Rural</div>
  <div id="p_apellido">{{primer_apellido}}</div>
  <div id="s_apellido">{{segundo_apellido}}</div>
<div id="p_nombre"><center>{{primer_nombre}}</center></div>
<div id="s_nombre"><center>{{segundo_nombre}}</center></div>
<div id="numero_documento">{{numero_documento}}</div>
<div id="fecha_nacimiento">{{fecha_nacimiento}}</div>
<div id="direccion"><center>{{direccion}}</center></div>
<div id="telefono_fijo">{{tel_fijo}}</div>
<div id="telefono_celular"><center>{{tel_celular}}</center></div>

<div id="correo_electronico">{{email}}</div>


<div id="checkrural"><center><strong>{{zona_urbana}}</strong></center></div>
<div id="checkurb"><center><strong>{{zona_rural}}</strong></center></div>
    
<div id="departamento_nombre"><center><strong>{{departamento}} </div>
<div id="con_primerapellido"><center><strong>{{ con_primerapellido }}</strong></center></div>
<div id="con_segundoapellido"><center><strong>{{ con_segundoapellido }}</strong></center></div>
<div id="con_primernombre"><center><strong>{{ con_primernombre }}</strong></center></div>
<div id="con_segundonombre"><center><strong>{{ con_segundonombre }}</strong></center></div>
<div id="con_fecha_nacimiento"><center><strong>{{ con_fecha_nacimiento }}</strong></center></div>
</div>
<div id="apDiv1"></div>
<div id="apDiv2"><center><strong>{{nov_2}}</strong></center></div>
<div id="apDiv3"><center><strong>{{nov_3}}</strong></center></div>
<div id="apDiv4"><center><strong>{{nov_4}}</strong></center></div>
<div id="apDiv5"><center><strong>{{nov_5}}</strong></center></div>
<div id="CodigoRet"><center><strong>{{cod_405}}</strong></center></div>
<div id="apDiv6"><center><strong>{{nov_6}}</strong></center></div>
<div id="apDiv7"></div>
<div id="apDiv8"></div>
<div id="apDiv9"></div>
<div id="apDiv10"><center><strong>{{nov_14}}</strong></center></div>
<div id="traa"><center><strong>{{nov_14}}</strong></center></div>
<div id="apDiv11"><center><strong>{{nov_15}}</strong></center></div>
<div id="apDiv12"></div>
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
<div id="apDiv23"></div>
<div id="apDiv24"></div>
<div id="apDiv25"></div>
<div id="apDiv26"></div>
<div id="apDiv27"></div>
<div id="apDiv28"></div>
<div id="apDiv29"></div>
<div id="apDiv30"></div>
<div id="apDiv31"></div>
<div id="apDiv32"></div>
<div id="apDiv33"></div>
<div id="apDiv34"></div>
<div id="apDiv35"></div>
<div id="apDiv36"></div>
<div id="apDiv37" style="font-size: 11px; text-align: center; padding-top: 4px;">{{localidad}}</div>
<div style="padding-top: 1350px; float:left; padding-left:0px;">
<img src="../../../assets/images/0002.jpg">
</div>

</body>
</html>