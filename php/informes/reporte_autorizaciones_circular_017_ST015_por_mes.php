<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte_Autorizaciones_Circular_017_ST015_por_mes"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");


//header("Content-Type: text/plain");

//header('Content-Disposition: attachment; filename="REPORTE_INCAPACIDADES.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
		$fecha_inicio = $_GET['fecha_inicio'];
		$fecha_final = $_GET['fecha_fin'];
		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"SELECT x.* from (
    SELECT lpad(af.afin_ubicacion_geografica, 5, 0) codigomunicipio,
    to_char(af.afif_nacimiento,'YYYYMMDD') fechaNacimiento,
    au.autc_tipo_doc_afiliado tipoid,
    au.autc_afiliado idAfiliado,
    upper(trim(au.autc_diagnostico)) DiagPpal,
    upper(decode (trim(au.autc_diagnostico1),'0','NA', 'A00','NA', 'N','NA', nvl(trim(au.autc_diagnostico1),'NA'))) DiagSec, 
    au.autn_autorizacion_manual idAutorizacion,
    to_char(au.autf_orden,'YYYYMMDD') fechaOrden, -- analizar
    to_char(au.autf_solicitud,'YYYYMMDD') fechaRadicacion, -- analizar
    to_char(au.autf_confirmado,'YYYYMMDD') fechaAutorizacion,
    case
      when pr.proc_tipo_producto = 'C' then trim(pr.proc_codigo)
      else 'NA'
    end codigoServicio,   
    case
      when pr.pron_clasificacion = 714 then trim(ad.audc_producto)
      else 'NA'
    end codigoMedicamento,
    case
      when trim(pr.proc_cobertura_3495) = 'PBS' then '1' 
      when trim(pr.proc_cobertura_3495) = 'PBS_CONDICIONADO' then '1' 
      when trim(pr.proc_cobertura_3495) = 'PBS CONDICIONADO' then '1' 
      when pr.proc_cobertura_3495 is null then decode(pr.proc_pos,'S','1', 'N','2')  
      else '2' 
    end PlanBeneficiosSalud,
    '2' posfechado,
    'NA' numEntregaposfec,
    af.afic_sexo sexo, -- add
    trunc(months_between('31/08/2020',af.afif_nacimiento)/12) edad,-- add
    dx.diac_nombre nombre_DiagPpal, -- add
    dx1.diac_nombre nombre_DiagSec, -- add
    pr.proc_nombre nombre_producto, -- add
    case au.autc_ubicacion_solicitud
      when 'H' THEN 'HOSPITALARIO'
      when 'C' THEN 'CONSULTA_EXTERNA'
      when 'U' THEN 'URGENCIA'
      when 'T' THEN 'TRANSPORTE'
      else 'CONSULTA EXTERNA' end ambito, --add
    case 
      when au.autn_clasificacion between 101 and 119 then 'HOSPITALARIO'
      when au.autn_clasificacion between 120 and 121 then 'HOSPITALIZACION_MEDICA' 
      when au.autn_clasificacion between 123 and 124 then 'UNIDAD_MENTAL'
      when au.autn_clasificacion = 125               then 'ALTO_COSTO'
      when au.autn_clasificacion between 126 and 128 then 'UNIDAD_MENTAL'
      when au.autn_clasificacion = 132               then 'UNIDAD_MENTAL'
      when au.autn_clasificacion between 201 and 235 then 'CIRUGIA_AMBULATORIA'
      when au.autn_clasificacion between 240 and 244 then 'ALTO_COSTO'
      when au.autn_clasificacion between 301 and 370 then 'CONSULTA_ESPECIALIZADA'
      when au.autn_clasificacion between 372 and 395 then 'CONSULTA_ESPECIALIZADA'
      when au.autn_clasificacion = 396               then 'HONORARIOS_ODONTOLOGIA_GENERAL'
      when au.autn_clasificacion = 398               then 'MEDICINA_ALTERNATIVA'
      when au.autn_clasificacion = 399               then 'ALTO_COSTO'--Se cambia por alto costo, antes PAQ_INTEGRAL_VIH
      when au.autn_clasificacion = 400               then 'MEDICINA_ALTERNATIVA'
      when au.autn_clasificacion = 401               then 'ATENCION_DOMICILIARIA'
      when au.autn_clasificacion between 402 and 403 then 'PROMOCION_Y_PREVENCION'
      when au.autn_clasificacion between 404 and 405 then 'MEDICINA_ALTERNATIVA'
      when au.autn_clasificacion = 406               then 'ALTO_COSTO'
      when au.autn_clasificacion = 407               then 'MEDICINA_DEL_TRABAJO'
      when au.autn_clasificacion = 408               then 'CONSULTA_ESPECIALIZADA'
      when au.autn_clasificacion = 409               then 'HOSPITALIZACION_QUIRURGICA'
      when au.autn_clasificacion = 410               then 'HONORARIOS_ODONTOLOGIA_ESPECIALIZADA'
      when au.autn_clasificacion = 411               then 'HOSPITALIZACION_QUIRURGICA'
      when au.autn_clasificacion between 501 and 502 then 'URGENCIAS'--Se cambia por Urgencias, antes CONSULTA_ESPECIALIZADA
      when au.autn_clasificacion between 601 and 602 then 'TRANSP_ASISTENCIAL'
      when au.autn_clasificacion between 701 and 713 then 'AYUDAS_DX_TERAPEUTICAS'
      when au.autn_clasificacion = 714               then 'MEDICAMENTOS'
      when au.autn_clasificacion between 715 and 732 then 'AYUDAS_DX_TERAPEUTICAS'
      when au.autn_clasificacion between 733 and 734 then 'ALTO_COSTO'
      when au.autn_clasificacion between 735 and 737 then 'MEDICINA_ALTERNATIVA'
      when au.autn_clasificacion = 738               then 'AYUDAS_DX_TERAPEUTICAS'
      when au.autn_clasificacion between 739 and 740 then 'SERVICIOS_COMPLEMENTACION_TERAPEUTICA'
      when au.autn_clasificacion = 741               then 'PROMOCION_Y_PREVENCION'
      when au.autn_clasificacion = 799               then 'MATERIALES_INSUMOS'
      when au.autn_clasificacion between 801 and 805 then 'UNIDAD_MENTAL'--Se incluye el 801
      when au.autn_clasificacion = 806               then 'PLANIFICACION_FAMILIAR'
      when au.autn_clasificacion = 807               then 'AYUDAS_DX_TERAPEUTICAS'
      when au.autn_clasificacion = 808               then 'OTROS_SERVICIOS'
      when au.autn_clasificacion between 809 and 813 then 'URGENCIAS'
      when au.autn_clasificacion = 814               then 'UNIDAD_MENTAL'
      when au.autn_clasificacion between 815 and 817 then 'ATENCION_DOMICILIARIA'
      when au.autn_clasificacion = 818               then 'TRANSP_ASISTENCIAL'
      when au.autn_clasificacion = 819               then 'UNIDAD_MENTAL'
      when au.autn_clasificacion = 820               then 'HOSPITALIZACION_MEDICA'
      when au.autn_clasificacion between 901 and 902 then 'PROMOCION_Y_PREVENCION'
      when au.autn_clasificacion = 904               then 'PLANIFICACION_FAMILIAR'
      when au.autn_clasificacion between 905 and 917 then 'PROMOCION_Y_PREVENCION'
      when au.autn_clasificacion = 918               then 'PLANIFICACION_FAMILIAR'
      when au.autn_clasificacion = 1000              then 'MATERIALES_INSUMOS'
      when au.autn_clasificacion = 1001              then 'ALBERGUE'
      else 'SIN_ASIGNAR' end unidad_funcional
    
    from eaut_autorizacion au
    inner join eafi_afiliado af on (au.autc_tipo_doc_afiliado = af.afic_tipo_documento
                                    and au.autc_afiliado = af.afic_documento
                                    and trim(af.afic_tipo_documento) in ('CC','CE','CD','PA','SC','PE','RC','TI','CN','NU'))
    inner join eaud_autorizacion_detalle ad on (au.autn_empresa = ad.audn_empresa
                                                and au.autc_documento = ad.audc_documento
                                                and au.autn_numero = ad.audn_numero
                                                and au.autn_ubicacion = ad.audn_ubicacion)
    inner join epro_producto pr on (trim(ad.audc_producto) = trim(pr.proc_codigo))
    left join edia_diagnostico dx on (trim(dx.diac_codigo) = trim(au.autc_diagnostico)) --add
    left join edia_diagnostico dx1 on (trim(dx1.diac_codigo) = trim(au.autc_diagnostico1)) --add
    
    where 1=1
    and trunc(au.autf_confirmado) between :fecha_inicio and :fecha_fin
    and au.autc_documento = 'AS'
    and au.autc_estado = 'P'
    and nvl(au.autc_status,'0') <> '5' -- se excluye las autorizaciones con status anulado
    ) x
    where ((x.codigoservicio <> 'NA') or (x.codigomedicamento <> 'NA')) -- se excluye los registros que no son CUPS 3495 ni tampoco son medicamentos (clasificacion: 714)
    --)
    "
	);
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':fecha_inicio',$fecha_inicio);
oci_bind_by_name($consulta,':fecha_fin',$fecha_final);

?>

<h1>Reporte Autorizaciones Circular 017 ST015 por mes </h1>
<h3>Parametros Del Reporte: <?php echo $fecha_inicio?> A <?php echo $fecha_final?> </h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
<tr>
<th>CODIGOMUNICIPIO	</th>
<th>FECHANACIMIENTO	</th>
<th>TIPOID	</th>
<th>IDAFILIADO	</th>
<th>DIAGPPAL</th>
<th>DIAGSEC	</th>
<th>IDAUTORIZACION	</th>
<th>FECHAORDEN	</th>
<th>FECHARADICACION	</th>
<th>FECHAAUTORIZACION	</th>
<th>CODIGOSERVICIO	</th>
<th>CODIGOMEDICAMENTO	</th>
<th>PLANBENEFICIOSSALUD	</th>
<th>POSFECHADO	</th>
<th>NUMENTREGAPOSFEC	</th>
<th>SEXO	</th>
<th>EDAD	</th>
<th>NOMBRE_DIAGPPAL	</th>
<th>NOMBRE_DIAGSEC	</th>
<th>NOMBRE_PRODUCTO	</th>
<th>AMBITO	</th>
<th>UNIDAD_FUNCIONAL</th>
  


</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	        echo "<tr>";

          echo "<td>"; echo$rows['CODIGOMUNICIPIO']; echo "</td>";
          echo "<td>"; echo$rows['FECHANACIMIENTO']; echo "</td>";
          echo "<td>"; echo$rows['TIPOID']; echo "</td>";
          echo "<td>"; echo$rows['IDAFILIADO']; echo "</td>";
          echo "<td>"; echo$rows['DIAGPPAL']; echo "</td>";
          echo "<td>"; echo$rows['DIAGSEC']; echo "</td>";
          echo "<td>"; echo$rows['IDAUTORIZACION']; echo "</td>";
          echo "<td>"; echo$rows['FECHAORDEN']; echo "</td>";
          echo "<td>"; echo$rows['FECHARADICACION']; echo "</td>";
          echo "<td>"; echo$rows['FECHAAUTORIZACION']; echo "</td>";
          echo "<td>"; echo$rows['CODIGOSERVICIO']; echo "</td>";
          echo "<td>"; echo$rows['CODIGOMEDICAMENTO']; echo "</td>";
          echo "<td>"; echo$rows['PLANBENEFICIOSSALUD']; echo "</td>";
          echo "<td>"; echo$rows['POSFECHADO']; echo "</td>";
          echo "<td>"; echo$rows['NUMENTREGAPOSFEC']; echo "</td>";
          echo "<td>"; echo$rows['SEXO']; echo "</td>";
          echo "<td>"; echo$rows['EDAD']; echo "</td>";
          echo "<td>"; echo$rows['NOMBRE_DIAGPPAL']; echo "</td>";
          echo "<td>"; echo$rows['NOMBRE_DIAGSEC']; echo "</td>";
          echo "<td>"; echo$rows['NOMBRE_PRODUCTO']; echo "</td>";
          echo "<td>"; echo$rows['AMBITO']; echo "</td>";
          echo "<td>"; echo$rows['UNIDAD_FUNCIONAL']; echo "</td>";




        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
