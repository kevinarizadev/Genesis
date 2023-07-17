<?php
require_once('../config/dbcon.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Informe_Afiliaciones"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");

global $fecha_inicio;
global $fecha_fin;
$fecha_inicio = $_GET["fecha_inicio"];
$fecha_fin = $_GET["fecha_fin"];

$cursor = oci_new_cursor($c);
$consulta = oci_parse($c,'begin pq_genesis_afiliacion_contributivo.p_reporte_excel(:v_f_inicio,
                                                                                    :v_f_final,
                                                                                    :v_response); end;');
oci_bind_by_name($consulta,':v_f_inicio',$fecha_inicio);
oci_bind_by_name($consulta,':v_f_final',$fecha_fin);
oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);

// $consulta = oci_parse($c,"SELECT CODIGO,UBICACION_TUTELA,RADICACION,FECHA_REGISTRO,TIPODOCUMENTOAFILIADO,
//                                   DOCUMENTOAFILIADO,NOMBREAFILIADO,UBICACION_AFILIADO,ACCIONANTE,NOMBRE_ACCIONANTE,
//                                   JUZGADO,RECEPCION,PLAZO,VENCIMIENTO,RESPUESTA,DIFERENCIA_DIAS, MEDIDA_PROVISIONAL, 
//                                   CAUSA,MOTIVO,FALLO,ADJUNTO_FALLO,TRATMIENTO,SEGUIMIENTO_CONTINUO,IMPUGNADO
//                            FROM vw_tutela_informe");
?>
<table cellspacing="0" cellpadding="0"  border="1" align="center">
    <tr>
        <th>CODIGO</th>
        <th>REGIONAL</th>
        <th>TIPO</th>
        <th>DOCUMENTO</th>
        <th>NOMBRE_AFILIADO</th>
        <th>NIT</th>
        <th>RAZON_SOCIAL</th>
        <th>ASESOR REGISTRA</th>
        <th>ESTADO</th>
        <th>MOTIVO RECHAZO</th>
        <th>FECHA_REGISTRO</th>
        <th>FECHA_PROCESA</th>
        <th>ASESOR</th>
        <th>FECHA AFILIACION</th>
    </tr>
<?php
oci_execute($consulta);
// oci_execute($consulta);
oci_execute($cursor, OCI_DEFAULT);
$datos = null;
oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
oci_free_statement($consulta);
oci_free_statement($cursor);
// echo json_encode($datos);
// Se recorre el array con los resultados obtenidos de la base de datos
foreach ($datos as $record) {
    echo "<tr>";
    echo "<td>"; echo$record['SMVN_CODIGO']; echo "</td>";
    echo "<td>"; echo$record['REGIONAL_RESPONSABLE']; echo "</td>";
    echo "<td>"; echo$record['SMVC_TIPO_DOC_COTIZANTE']; echo "</td>";
    echo "<td>"; echo$record['SMVC_DOC_COTIZANTE']; echo "</td>";
    echo "<td>"; echo$record['NOMBRE_AFILIADO']; echo "</td>";
    echo "<td>"; echo$record['NIT']; echo "</td>";
    echo "<td>"; echo$record['RAZON_SOCIAL']; echo "</td>";
    echo "<td>"; echo$record['USUARIO_REGISTRA']; echo "</td>";
    echo "<td>"; echo$record['ESTADO']; echo "</td>";
    echo "<td>"; echo$record['MOTIVO_RECHAZO']; echo "</td>";
    echo "<td>"; echo$record['FECHA_REGISTRO']; echo "</td>";
    echo "<td>"; echo$record['FECHA_PROCESA']; echo "</td>";
    echo "<td>"; echo$record['ASESOR']; echo "</td>";
    echo "<td>"; echo$record['FECHA_AFIL']; echo "</td>";
	echo "</tr>";
}
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);
?>