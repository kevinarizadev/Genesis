<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon.php');
// Propiedades del documentos para que la tabla sea descargadad

header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=REPORTE_AUTORIZACIONES_POR_IPS"."_".date("d-m-Y").".xls");
header("Pragma: no-cache");
header("Expires: 0");

$nitips = $_GET['nitips'];
$fechainicio = $_GET['fechainicio'];
$fechafin = $_GET['fechafin'];

$consulta = oci_parse($c,"BEGIN PQ_AUT_PRESTACION.P_LISTA_AUT_PSS(:v_pnit,:v_pinicial,:v_pfinal,:v_json_row); end;");
oci_bind_by_name($consulta,':v_pnit',$nitips);
oci_bind_by_name($consulta,':v_pinicial',$fechainicio);
oci_bind_by_name($consulta,':v_pfinal',$fechafin);
?>

<h1>Reporte prestacion ips </h1>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
    <!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
    <tr>
        <th>SECCIONAL_AFILIADO</th>
        <th>MUNICIPIO</th>
        <th>PRESTADOR_AUTORIZADO</th>
        <th>TIPO_DOC</th>
        <th>NUM_DOC</th>
        <th>EDAD</th>
        <th>FECHA_ORDEN</th>
        <th>NUM_AUT</th>
        <th>CLASE_AUTORIZADO</th>
        <th>FECHA_AUTORIZACION</th>
        <th>COD_DX</th>
        <th>DIAGNOSTICO'</th>
        <th>COD_PRODUCTO</th>
        <th>NOMBRE_PRODUCTO</th>
        <th>TIPO_AMBITO</th>
        <th>UNIDAD_FUNCIONAL</th>
        <th>FECHA_SOLICITUD</th>
        <th>FECHA_PRESTACION_IPS</th>
        <th>FECHA_PRESTACION_RIPS</th>
    </tr>
    
    
    
    <?php
$clob = oci_new_descriptor($c,OCI_D_LOB);
oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
oci_execute($consulta,OCI_DEFAULT);
if (isset($clob)) {
    $rows = $clob->read($clob->size());
}

$datos = json_decode($rows);


foreach( $datos as $row)
{
    echo "<tr>";
    echo "<td>";
    echo $row->SECCIONAL_AFILIADO;
    echo "</td>";
    echo "<td>";
    echo $row->MUNICIPIO;
    echo "</td>";
    echo "<td>";
    echo $row->PRESTADOR_AUTORIZADO;
    echo "</td>";
    echo "<td>";
    echo $row->TIPO_DOC;
    echo "</td>";
    echo "<td>";
    echo $row->NUM_DOC;
    echo "</td>";
    echo "<td>";
    echo $row->EDAD;
    echo "</td>";
    echo "<td>";
    echo $row->FECHA_ORDEN;
    echo "</td>";        
    echo "<td>";
    echo $row->NUM_AUT;
    echo "</td>";
    echo "<td>";
    echo $row->CLASE_AUTORIZADO;
    echo "</td>";
    echo "<td>";
    echo $row->FECHA_AUTORIZACION;
    echo "</td>";
    echo "<td>";
    echo $row->COD_DX;
    echo "</td>";
    echo "<td>";
    echo $row->DIAGNOSTICO;
    echo "</td>";
    echo "<td>";
    echo $row->COD_PRODUCTO;
    echo "</td>";
    echo "<td>";
    echo $row->NOMBRE_PRODUCTO;
    echo "</td>";
    echo "<td>";
    echo $row->TIPO_AMBITO;
    echo "</td>";
    echo "<td>";
    echo $row->UNIDAD_FUNCIONAL;
    echo "</td>";
    echo "<td>";
    echo $row->FECHA_SOLICITUD;
    echo "</td>";
    echo "<td>";
    echo $row->FECHA_PRESTACION_IPS;
    echo "</td>";
    echo "<td>";
    echo $row->FECHA_PRESTACION_RIPS;
    echo "</td>";
    echo "</tr>";
   
 }
 
oci_close($c);

?>
