<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Avanzado de Actividades PGP " . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$Nit = $_GET['Nit'];
$F_Inicio = $_GET['F_Inicio'];
$F_Fin = $_GET['F_Fin'];
$Tipo = $_GET['Tipo'];
$F_Fin = $_GET['F_Fin'];
$Tipo_Doc = $_GET['Tipo_Doc'];
$Num_Doc = $_GET['Num_Doc'];
?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
    <th>Regimen del Contrato</th>
    <th>Numero del Contrato</th>
    <th>Codigo Ubicacion del Contrato </th>
    <th>Nombre de la Ubicacion Contrato </th>
    <th>NIT</th>
    <th>Razon Social </th>
    <th>Tipo de Documento del Afiliado</th>
    <th>Numero de Documento del Afiliado</th>
    <th>Nombre Completo del Afiliado</th>
    <th>Edad del Afiliado </th>
    <th>Genero del Afiliado </th>
    <th>Codigo del Municipio de Afiliacion </th>
    <th>Nombre del Municipio de Afiliacion </th>
    <th>Nombre del Producto </th>
    <th>Codigo del Producto</th>
    <th>Cantidad del Producto</th>
    <th>Diagnostico</th>
    <th>Codigo Diagnostico </th>
    <th>Ambito </th>
    <th>Portabilidad </th>
    <th>Fecha de Prestacion </th>
    <th>Fecha de Registro de la Actividad</th>
    <!-- <th>Poblacion Total Afiliada del Contrato</th> -->
    <!-- <th>Cantidad Mensual del Producto </th> -->
    <th>Costo Mensual del Producto </th>
    </tr>
    <?php

    global $request;
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_CONTRATACION.P_LISTA_EPS_REGISTRO_PGP(:v_ptercero,:v_fecha_inicio,:v_fecha_fin,:v_ptipo_busqueda,
	:v_ptipodocumento,:v_pdocumento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ptercero', $Nit);
	oci_bind_by_name($consulta, ':v_fecha_inicio', $F_Inicio);
	oci_bind_by_name($consulta, ':v_fecha_fin', $F_Fin);
	oci_bind_by_name($consulta, ':v_ptipo_busqueda', $Tipo);
	oci_bind_by_name($consulta, ':v_ptipodocumento', $Tipo_Doc);
	oci_bind_by_name($consulta, ':v_pdocumento', $Num_Doc);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $json = $clob->read($clob->size());
    $datos = json_decode($json);

    foreach  ($datos as $row) {
        echo "<tr>";
        echo "<td>";echo $row->regimen_contrato;echo "</td>";
        echo "<td>";echo $row->numero_contrato;echo "</td>";
        echo "<td>";echo $row->cod_ubic_contrato;echo "</td>";
        echo "<td>";echo $row->nombre_ubic_contrato;echo "</td>";
        echo "<td>";echo $row->nit;echo "</td>";
        echo "<td>";echo $row->nombre_ips;echo "</td>";
        echo "<td>";echo $row->tipo_doc_afiliado;echo "</td>";
        echo "<td>";echo $row->num_doc_afiliado;echo "</td>";
        echo "<td>";echo $row->nombre_completo;echo "</td>";
        echo "<td>";echo $row->edad;echo "</td>";
        echo "<td>";echo $row->genero;echo "</td>";
        echo "<td>";echo $row->cod_mpio_afiliacion;echo "</td>";
        echo "<td>";echo $row->mpio_afiliacion;echo "</td>";
        echo "<td>";echo $row->codigo_producto;echo "</td>";
        echo "<td>";echo $row->nombre_producto;echo "</td>";
        echo "<td>";echo $row->cantidad;echo "</td>";
        echo "<td>";echo $row->diagnostico;echo "</td>";
        echo "<td>";echo $row->nombre_diagnostico;echo "</td>";
        echo "<td>";echo $row->ambito;echo "</td>";
        echo "<td>";echo $row->portabilidad;echo "</td>";
        echo "<td>";echo $row->fecha_prestacion;echo "</td>";
        echo "<td>";echo $row->fecha_registro;echo "</td>";
        // echo "<td>";echo $row->poblacion_total;echo "</td>";
        // echo "<td>";echo 'FALTA';echo "</td>";
        echo "<td>";echo $row->valor_producto;echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>