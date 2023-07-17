<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte Solicitudes mesa de Ayuda Administrativo"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");


//header("Content-Type: text/plain");

//header('Content-Disposition: attachment; filename="REPORTE_INCAPACIDADES.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048
$annos = $_GET['anno'];
$periodo = $_GET['periodo'];


		//$PERIODO =$MES.'/'.$ANO;
		//echo($PERIODO);
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c," SELECT  s.fecha_radicacion FECHA, 
                                  s.numero NUMERO,
                                  f.pqrc_nombre_medio MEDIO,
                                  case when s.tiporadicacion= 'A' then 'AFILIADO' when s.tiporadicacion= 'I' then 'IPS' else 'ENTE DE CONTROL' end  TIPO, 
       s.codnurc CODIGONURC,
       s.codpqrsupersalud CODIGOSUPER,
       e.pqrc_nombre ENTE,
       case when s.estado= 'A' then 'ACTIVO' else 'PROCESADO' end ESTADO,
       s.observaciones OBSERVACION,
       b.arec_nombre AREA,
       bt.terc_nombre RADICADOR,
       btr.terc_nombre RESPONSABLE,
        mc.pqrc_nombre_macromotivo MACROMOTIVO,
       me.pqrc_nombre_macromotivo_especifico MACROMOTIVOESPECIFICO,
       mg.pqrc_nombre_macromotivo_general MACROMOTIVOGENERAL,
       s.fecha_recibido FECHARECIBIDO,
       s.fecha_entrega FECHAENTREGA,
       s.diashabiles DIASHABILES,
       ss.pqr_fecha_creacion FECHACIERRE,
       case when s.estado = 'A' then 'ACTIVO' else 'PROCESADO' end ESTADOPQR
from pqr_solicitud s
inner join pqr_medio f on s.mediorecepcion = f.pqrn_codigo_medio
inner join bare_area b on b.aren_codigo = s.area_delegada
left join pqr_ente_control e on e.pqrn_codigo_ente_control = s.otrosentesdecontrol 
left join bter_tercero bt on bt.terv_codigo =  s.radicador
left join bter_tercero btr on btr.terv_codigo =  s.responsable
left join pqr_macromotivo mc on mc.pqrn_codigo_macromotivo =  s.macromotivo 
left join pqr_macromotivo_especifico me on me.pqrn_codigo_macromotivo_especifico = s.motivoespecifico  
left join pqr_macromotivo_general mg on mg.pqrn_codigo_macromotivo_general = s.motivogeneral
left join pqr_secundario ss on ss.pqr_codigo = s.numero and ss.pqr_fase = 'S'
where (to_char(fecha_radicacion,'MM') = :periodo or to_char(fecha_radicacion,'MM') = '0'||:periodo)  and 
      to_char(fecha_radicacion,'YYYY')=:anno");



// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':anno',$annos);
oci_bind_by_name($consulta,':periodo',$periodo);


?>

<h1>Reporte Solicitudes de PQR </h1>
<h3>Parametros Del Reporte: Anno <?php echo $annos?> Mes <?php echo $periodo?></h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
			<tr>
          <th>FECHA</th>
          <th>NUMERO</th>
          <th>MEDIO</th>
          <th>TIPO</th>
          <th>CODIGONURC</th>
          <th>CODIGOSUPER</th>
          <th>ENTE</th>
          <th>ESTADO</th>
          <th>OBSERVACION</th>
          <th>AREA</th>
          <th>RADICADOR</th>
          <th>RESPONSABLE</th>
          <th>MACROMOTIVOESPECIFICO</th>
          <th>MACROMOTIVOGENERAL</th>
          <th>FECHARECIBIDO</th>
          <th>FECHAENTREGA</th>
          <th>DIASHABILES</th>
          <th>FECHACIERRE</th>
          <th>ESTADOPQR</th>








          
          
          
          
          
          
          
			</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	        echo "<tr>";
                      echo "<td>"; echo$rows['FECHA']; echo "</td>";
                      echo "<td>"; echo$rows['NUMERO']; echo "</td>";
                      echo "<td>"; echo$rows['MEDIO']; echo "</td>";
                      echo "<td>"; echo$rows['TIPO']; echo "</td>";
                      echo "<td>"; echo$rows['CODIGONURC']; echo "</td>";
                      echo "<td>"; echo$rows['CODIGOSUPER']; echo "</td>";
                      echo "<td>"; echo$rows['ENTE']; echo "</td>";
                      echo "<td>"; echo$rows['ESTADO']; echo "</td>";
                      echo "<td>"; echo$rows['OBSERVACION']; echo "</td>";
                      echo "<td>"; echo$rows['AREA']; echo "</td>";
                      echo "<td>"; echo$rows['RADICADOR']; echo "</td>";
                      echo "<td>"; echo$rows['RESPONSABLE']; echo "</td>";

                       echo "<td>"; echo$rows['MACROMOTIVOESPECIFICO']; echo "</td>";
                      echo "<td>"; echo$rows['MACROMOTIVOGENERAL']; echo "</td>";
                      echo "<td>"; echo$rows['FECHARECIBIDO']; echo "</td>";
                      echo "<td>"; echo$rows['FECHAENTREGA']; echo "</td>";
                      echo "<td>"; echo$rows['DIASHABILES']; echo "</td>";
                      echo "<td>"; echo$rows['FECHACIERRE']; echo "</td>";
                      echo "<td>"; echo$rows['ESTADOPQR']; echo "</td>";

        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
