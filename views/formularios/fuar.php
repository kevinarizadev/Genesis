<!doctype html>
<html ng-app="FuarApp" >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Formulario Único de Afiliación</title>
<link rel="stylesheet" href="../../assets/css/fuar.css">
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
</style>
<script src="../../bower_components/angular/angular.js"></script>
<script src="../../bower_components/jquery/dist/jquery.js"></script>
<script src="../../scripts/controllers/dataGrid/fuarcontroller.js"></script>
<script src="../../scripts/const/const.js"></script>
<script type="text/javascript" src="../../js/ngStorage.js"></script>
</head>


<body ng-controller="mainController" id="test" ng-cloak>	

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
    <div id="checka1"><center><strong>X</strong></center></div>
    <div id="b1">B. Reporte de novedades</div>
    <div id="checkb1"></div>
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
    <div id="checkb4"><center><strong>X</strong></center></div>
    <div id="c4">C. Beneficiario</div>
    <div id="checkc4"></div>
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


<div id="checkrural"><center><strong>{{zona_rural}}</strong></center></div>
<div id="checkurb"><center><strong>{{zona_urbana}}</strong></center></div>
    
<div id="departamento_nombre"><center><strong>{{departamento}} </div>
<div id="con_primerapellido"><center><strong>{{ con_primerapellido }}</strong></center></div>
<div id="con_segundoapellido"><center><strong>{{ con_segundoapellido }}</strong></center></div>
<div id="con_primernombre"><center><strong>{{ con_primernombre }}</strong></center></div>
<div id="con_segundonombre"><center><strong>{{ con_segundonombre }}</strong></center></div>
<div id="con_fecha_nacimiento"><center><strong>{{ con_fecha_nacimiento }}</strong></center></div>
</div>
<div style="padding-top: 1350px; float:left; padding-left:0px;">
<img src="0002.jpg">
</div>

</body>
</html>