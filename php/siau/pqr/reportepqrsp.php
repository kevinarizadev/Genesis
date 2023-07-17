<?php
// Se abre la conexion a la base de datos

require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte Total PQRS"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");

 $consulta = oci_parse($c,"SELECT trim(p.numero) CODIGO,       
 trim(p.fecha_radicacion) FECHARAD,
       trim(p.fecha_entrega) FECHAENT,
       trim( p.tiposolicitud) TIPOSOL,       
       trim( p.mediorecepcion) CODREC,       
       trim( x.pqrc_nombre_medio) NOMMEDIO,       
       trim (p.observaciones) OBSERVACION,       
       trim( p.diashabiles) DIAS,       
       trim( p.responsable) CODRESP,       
       trim( b.terc_nombre) RESPONSABLE,
       trim(p.pqrfile) RUTA, 
       case when p.estado = 'A' then 'Activo' 
            when p.estado = 'P' then 'Procesado' end ESTADO,
       case when p.area_delegada in (26,4,3) then 'A' 
             else 'S' end AREA,                     
       CASE WHEN p.tiposolicitud ='F' THEN 'FELICITACIONES' --Alta
            WHEN p.tiposolicitud ='D' THEN 'DERECHO DE PETICION' --Media
            WHEN p.tiposolicitud ='Q' THEN 'QUEJA' --Baja
            WHEN p.tiposolicitud ='R' THEN 'RECLAMO' --Baja
            WHEN p.tiposolicitud ='S' THEN 'SUGERENCIA' --Baja
            ELSE 'CONSULTA Y/O SOLICITUD DE INFORMACION' ---Sin prioridad
       END SOLICITUD,
       'P' ASIGNADO
     from pqr_solicitud p
     inner join pqr_medio x on x.pqrn_codigo_medio =  p.mediorecepcion 
     inner join bter_tercero b on b.terv_codigo = p.responsable 
     where --p.responsable = v_presponsable and 
           p.estado ='P'");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

?>

<h1>LISTADO DE PQRS</h1>
<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->

      <tr>
            <th>NUMERO PQR</th>
            <th>TIPO SOLICITUD</th> 
            <th>MEDIO RECEPCION</th>           
            <th>DESCRIPCION</th>
            <th>FECHA RADICACION</th>
            <th>FECHA VENCIMIENTO</th>
            <th>AREA</th>
            <th>RESPONSABLE</th>
            <th>ESTADO</th>          
      </tr>

<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
 while( $rows = oci_fetch_assoc($consulta))
 {
	        echo "<tr>";

                      echo "<td>"; echo$rows['CODIGO']; echo "</td>";
                      echo "<td>"; echo$rows['SOLICITUD']; echo "</td>";
                      echo "<td>"; echo$rows['NOMMEDIO']; echo "</td>";
                      echo "<td>"; echo$rows['OBSERVACION']; echo "</td>";
                      echo "<td>"; echo$rows['FECHARAD']; echo "</td>";
                      echo "<td>"; echo$rows['FECHAENT']; echo "</td>";
                      echo "<td>"; echo$rows['AREA'] == 'S' ? 'SALUD' : 'ASEGURAMIENTO';  echo "</td>";
                      echo "<td>"; echo$rows['RESPONSABLE']; echo "</td>";
                      echo "<td>"; echo$rows['ESTADO']; echo "</td>";
        echo "</tr>";
 }
//  // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
