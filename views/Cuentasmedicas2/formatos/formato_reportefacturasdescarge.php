<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Envio de Factura (" . $_GET['reporte'] . ")- " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

if ($_GET['reporte'] == 'EREF') {
    $fecha_i = $_GET['fecha_i'];
    $fecha_f = $_GET['fecha_f'];
    $doc = $_GET['doc'];
    $ced = $_GET['ced'];
    $estado = $_GET['estado'];
}
if ($_GET['reporte'] == 'EFCE') {
    $fecha_i = $_GET['fecha_i'];
    $fecha_f = $_GET['fecha_f'];
    $doc = $_GET['doc'];
    $con = $_GET['con'];
    $rad = $_GET['rad'];
    $ced = $_GET['ced'];
    $estado = $_GET['estado'];
    $nit = $_GET['nit'];
}
if (($_GET['reporte'] == 'EGRP')) {
    $v_pnit = $_GET['v_pnit'];
    $v_pestado = $_GET['v_pestado'];
    $v_pfechaini = $_GET['v_pfechaini'];
    $v_pfechafin = $_GET['v_pfechafin'];
    $v_pfactura = $_GET['v_pfactura'];
    $v_pvalormin = $_GET['v_pvalormin'];
    $v_pvalormax = $_GET['v_pvalormax'];
}

?>
<!-- <table cellspacing="0" cellpadding="0" border="1" align="center"> -->

<!-- <tr>
            <th>FACC_DOCUMENTO</th>
            <th>FACC_CONCEPTO</th>
            <th>FACC_NUMERO</th>
            <th>FACC_UBICACION</th>
            <th>FACV_TERCERO</th>
            <th>FACV_TOTAL</th>
            <th>FACC_ESTADO</th>
            <th>FACC_PREFIJO</th>
            <th>FACN_FACTURA2</th>
            <th>FACC_FACTURA</th>
            <th>FACC_ALTO_COSTO</th>
            <th>TERC_NOMBRE</th>
            <th>FACC_CONFIRMACION</th>
            <th>FACN_RECIBO</th>
            <th>RECF_FECHA</th>
            <th>FACV_COPAGO</th>
            <th>FACV_RESPONSABLE</th>
            <th>NOMBRE_RESPONSABLE</th>
        </tr> -->
<?php
if ($_GET['reporte'] == 'EREF') {
    echo "<table>";
    echo "<th>";
    echo "FACC_DOCUMENTO";
    echo "</th>";
    echo "<th>";
    echo "FACC_CONCEPTO";
    echo "</th>";
    echo "<th>";
    echo "FACC_NUMERO";
    echo "</th>";
    echo "<th>";
    echo "FACC_UBICACION";
    echo "</th>";
    echo "<th>";
    echo "FACV_TERCERO";
    echo "</th>";
    echo "<th>";
    echo "FACV_TOTAL";
    echo "</th>";
    echo "<th>";
    echo "FACC_ESTADO";
    echo "</th>";
    echo "<th>";
    echo "FACC_PREFIJO";
    echo "</th>";
    echo "<th>";
    echo "FACN_FACTURA2";
    echo "</th>";
    echo "<th>";
    echo "FACC_FACTURA";
    echo "</th>";
    echo "<th>";
    echo "FACC_ALTO_COSTO";
    echo "</th>";
    echo "<th>";
    echo "TERC_NOMBRE";
    echo "</th>";
    echo "<th>";
    echo "FACC_CONFIRMACION";
    echo "</th>";
    echo "<th>";
    echo "FACN_RECIBO";
    echo "</th>";
    echo "<th>";
    echo "RECF_FECHA";
    echo "</th>";
    echo "<th>";
    echo "FACV_COPAGO";
    echo "</th>";
    echo "<th>";
    echo "FACV_RESPONSABLE";
    echo "</th>";
    echo "<th>";
    echo "NOMBRE_RESPONSABLE";
    echo "</th>";

    $consulta = oci_parse($c, 'begin PQ_GENESIS_FACTURACION.p_lista_facturas_eref(:v_pdocumento,:v_pfechaini,:v_pfechafin,:v_presponsable,:v_pestado,:v_json_out,:v_json_resumen,:v_result); end;');
    oci_bind_by_name($consulta, ':v_pdocumento', $doc);
    oci_bind_by_name($consulta, ':v_pfechaini', $fecha_i);
    oci_bind_by_name($consulta, ':v_pfechafin', $fecha_f);
    oci_bind_by_name($consulta, ':v_presponsable', $ced);
    oci_bind_by_name($consulta, ':v_pestado', $estado);
    oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
    oci_bind_by_name($consulta, ':v_json_resumen', $json2, 4000);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);

    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<td>";
        echo $row['DOCUMENTO'];
        echo "</td>";
        echo "<td>";
        echo $row['CONCEPTO'];
        echo "</td>";
        echo "<td>";
        echo $row['NUMERO'];
        echo "</td>";
        echo "<td>";
        echo $row['UBICACION'];
        echo "</td>";
        echo "<td>";
        echo $row['TERCERO'];
        echo "</td>";
        echo "<td>";
        echo $row['TOTAL'];
        echo "</td>";
        echo "<td>";
        echo $row['ESTADO'];
        echo "</td>";
        echo "<td>";
        echo $row['PREFIJO'];
        echo "</td>";
        echo "<td>";
        echo $row['FACTURA2'];
        echo "</td>";
        echo "<td>";
        echo $row['FACTURA'];
        echo "</td>";
        echo "<td>";
        echo $row['ALTOCOSTO'];
        echo "</td>";
        echo "<td>";
        echo $row['NOMBRE_TERCERO'];
        echo "</td>";
        echo "<td>";
        echo $row['CONFIRMACION'];
        echo "</td>";
        echo "<td>";
        echo $row['RECIBO'];
        echo "</td>";
        echo "<td>";
        echo $row['RECIBO_FECHA'];
        echo "</td>";
        echo "<td>";
        echo $row['COPAGO'];
        echo "</td>";
        echo "<td>";
        echo $row['IDRESPONSABLE'];
        echo "</td>";
        echo "<td>";
        echo $row['RESPONSABLE'];
        echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
}
?>

<?php
if ($_GET['reporte'] == 'EFCE') {
    echo "<table>";
    echo "<th>";
    echo "NUMERO";
    echo "</th>";
    echo "<th>";
    echo "UBICACION";
    echo "</th>";
    echo "<th>";
    echo "FECHA";
    echo "</th>";
    echo "<th>";
    echo "FECHA_RAD";
    echo "</th>";
    echo "<th>";
    echo "TERCERO";
    echo "</th>";
    echo "<th>";
    echo "NOMBRE_PRESTADOR";
    echo "</th>";
    echo "<th>";
    echo "VR_BRUTO";
    echo "</th>";
    echo "<th>";
    echo "IVA";
    echo "</th>";
    echo "<th>";
    echo "TOTAL";
    echo "</th>";
    echo "<th>";
    echo "ESTADO";
    echo "</th>";
    echo "<th>";
    echo "EMPRESA";
    echo "</th>";
    echo "<th>";
    echo "DOCUMENTO";
    echo "</th>";
    echo "<th>";
    echo "COD_ORIGEN";
    echo "</th>";
    echo "<th>";
    echo "ORIGEN";
    echo "</th>";
    echo "<th>";
    echo "COD_CONCEPTO_FACTURA";
    echo "</th>";
    echo "<th>";
    echo "CONCEPTO_FACTURA";
    echo "</th>";
    echo "<th>";
    echo "COD_CONCEPTO_CONTRATO";
    echo "</th>";
    echo "<th>";
    echo "CONCEPTO_CONTRATO";
    echo "</th>";
    echo "<th>";
    echo "dIDPROCESA";
    echo "</th>";
    echo "<th>";
    echo "NOMBRE_PROCESA";
    echo "</th>";
    echo "<th>";
    echo "IDRADICADOR";
    echo "</th>";
    echo "<th>";
    echo "NOMBRE_RADICADOR";
    echo "</th>";
    echo "<th>";
    echo "TOTAL_PROVEEDOR";
    echo "</th>";
    echo "<th>";
    echo "FINAL";
    echo "</th>";
    echo "<th>";
    echo "CONTRATO";
    echo "</th>";
    echo "<th>";
    echo "FACTURA";
    echo "</th>";
    echo "<th>";
    echo "MUNICIPIO";
    echo "</th>";
    echo "<th>";
    echo "DEPARTAMENTO";
    echo "</th>";
    echo "<th>";
    echo "CLASE";
    echo "</th>";
    echo "<th>";
    echo "ANNO";
    echo "</th>";
    echo "<th>";
    echo "PERIODO";
    echo "</th>";
    echo "<th>";
    echo "FECHA_LEGALIZACION";
    echo "</th>";
    echo "<th>";
    echo "CODUBICACION";
    echo "</th>";
    echo "<th>";
    echo "TIPO_DOC";
    echo "</th>";
    echo "<th>";
    echo "DOCUMENTO_AFI";
    echo "</th>";
    echo "<th>";
    echo "NOMBRE_AFILIADO";
    echo "</th>";
    echo "<th>";
    echo "FECHA_AUTORIZACION";
    echo "</th>";
    echo "<th>";
    echo "TIPO_AUTORIZACION";
    echo "</th>";
    // echo "<th>";echo "F_DATO_AUTORIZACION";echo "</th>";
    echo "<th>";
    echo "AUT_MANUAL";
    echo "</th>";

    $consulta = oci_parse($c, 'begin PQ_GENESIS_FACTURACION.p_lista_facturas_efce(:v_pdocumento,:v_pconcepto,:v_pfechaini,:v_pfechafin,:v_pradicador,:v_presponsable,:v_pestado,:v_pnit,:v_json_out,:v_json_resumen,:v_result); end;');
    oci_bind_by_name($consulta, ':v_pdocumento', $doc);
    oci_bind_by_name($consulta, ':v_pconcepto', $con);
    oci_bind_by_name($consulta, ':v_pfechaini', $fecha_i);
    oci_bind_by_name($consulta, ':v_pfechafin', $fecha_f);
    oci_bind_by_name($consulta, ':v_pradicador', $rad);
    oci_bind_by_name($consulta, ':v_presponsable', $ced);
    oci_bind_by_name($consulta, ':v_pestado', $estado);
    oci_bind_by_name($consulta, ':v_pnit', $nit);
    oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
    oci_bind_by_name($consulta, ':v_json_resumen', $json2, 4000);
    $curs2 = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_result", $curs2, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs2);

    ///
    // $consulta = oci_parse($c, 'begin PQ_GENESIS_PRUEBAS_SP.p_lista_facturas_eref(:v_pdocumento,:v_pfechaini,:v_pfechafin,:v_presponsable,:v_pestado,:v_json_out,:v_json_resumen,:v_result); end;');
    // oci_bind_by_name($consulta, ':v_pdocumento', $doc);
    // oci_bind_by_name($consulta, ':v_pfechaini', $fecha_i);
    // oci_bind_by_name($consulta, ':v_pfechafin', $fecha_f);
    // oci_bind_by_name($consulta, ':v_presponsable', $ced);
    // oci_bind_by_name($consulta, ':v_pestado', $estado);
    // oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
    // oci_bind_by_name($consulta, ':v_json_resumen', $json2, 4000);
    // $curs = oci_new_cursor($c);
    // oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
    // oci_execute($consulta);
    // oci_execute($curs);

    //

    while (($row = oci_fetch_array($curs2, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tr>";
        echo "<th>";
        echo "NUMERO";
        echo "</th>";
        echo "<td>";
        echo $row["UBICACION"];
        echo "</td>";
        echo "<td>";
        echo $row["FECHA"];
        echo "</td>";
        echo "<td>";
        echo $row["FECHA_RAD"];
        echo "</td>";
        echo "<td>";
        echo $row["TERCERO"];
        echo "</td>";
        echo "<td>";
        echo $row["NOMBRE_PRESTADOR"];
        echo "</td>";
        echo "<td>";
        echo $row["VR_BRUTO"];
        echo "</td>";
        echo "<td>";
        echo $row["IVA"];
        echo "</td>";
        echo "<td>";
        echo $row["TOTAL"];
        echo "</td>";
        echo "<td>";
        echo $row["ESTADO"];
        echo "</td>";
        echo "<td>";
        echo $row["EMPRESA"];
        echo "</td>";
        echo "<td>";
        echo $row["DOCUMENTO"];
        echo "</td>";
        echo "<td>";
        echo $row["COD_ORIGEN"];
        echo "</td>";
        echo "<td>";
        echo $row["ORIGEN"];
        echo "</td>";
        echo "<td>";
        echo $row["COD_CONCEPTO_FACTURA"];
        echo "</td>";
        echo "<td>";
        echo $row["CONCEPTO_FACTURA"];
        echo "</td>";
        echo "<td>";
        echo $row["COD_CONCEPTO_CONTRATO"];
        echo "</td>";
        echo "<td>";
        echo $row["CONCEPTO_CONTRATO"];
        echo "</td>";
        echo "<td>";
        echo $row["dIDPROCESA"];
        echo "</td>";
        echo "<td>";
        echo $row["NOMBRE_PROCESA"];
        echo "</td>";
        echo "<td>";
        echo $row["IDRADICADOR"];
        echo "</td>";
        echo "<td>";
        echo $row["NOMBRE_RADICADOR"];
        echo "</td>";
        echo "<td>";
        echo $row["TOTAL_PROVEEDOR"];
        echo "</td>";
        echo "<td>";
        echo $row["FINAL"];
        echo "</td>";
        echo "<td>";
        echo $row["CONTRATO"];
        echo "</td>";
        echo "<td>";
        echo $row["FACTURA"];
        echo "</td>";
        echo "<td>";
        echo $row["MUNICIPIO"];
        echo "</td>";
        echo "<td>";
        echo $row["DEPARTAMENTO"];
        echo "</td>";
        echo "<td>";
        echo $row["CLASE"];
        echo "</td>";
        echo "<td>";
        echo $row["ANNO"];
        echo "</td>";
        echo "<td>";
        echo $row["PERIODO"];
        echo "</td>";
        echo "<td>";
        echo $row["FECHA_LEGALIZACION"];
        echo "</td>";
        echo "<td>";
        echo $row["CODUBICACION"];
        echo "</td>";
        echo "<td>";
        echo $row["TIPO_DOC"];
        echo "</td>";
        echo "<td>";
        echo $row["DOCUMENTO_AFI"];
        echo "</td>";
        echo "<td>";
        echo $row["NOMBRE_AFILIADO"];
        echo "</td>";
        echo "<td>";
        echo $row["FECHA_AUTORIZACION"];
        echo "</td>";
        echo "<td>";
        echo $row["TIPO_AUTORIZACION"];
        echo "</td>";
        // echo "<td>";echo $row["F_DATO_AUTORIZACION"];echo "</td>";
        echo "<td>";
        echo $row["AUT_MANUAL"];
        echo "</td>";
        echo "</tr>";
    }

    oci_close($c);
}

?>

<?php
if ($_GET['reporte'] == 'EGRP') {
    echo "<table>";
    echo " <thead>
    <tr>
        <th>ANOO</th>
        <th>CODIGO_GLOSA</th>
        <th>DOCUMENTO_FD</th>
        <th>DOCUMENTO_FS</th>
        <th>ESTADO_FD</th>
        <th>FACTURA</th>
        <th>FECHA_FS</th>
        <th>FECHA_GLOSA</th>
        <th>GLOSA</th>
        <th>NIT</th>
        <th>NOMBRE</th>
        <th>NUMERO_FD</th>
        <th>NUMERO_FS</th>
        <th>OBSERVACION</th>
        <th>PERIODO</th>
        <th>RAZON</th>
        <th>RECIBO</th>
        <th>SERVICIO</th>
        <th>TOTAL_FD</th>
        <th>TOTAL_FS</th>
        <th>TOTAL_SERVICIO</th>
        <th>UBICACION_FD</th>
        <th>UBICACION_FS</th>
        <th>VALOR_GLOSA</th>

    </tr>
</thead>";
   

    $consulta = oci_parse($c, 'begin PQ_GENESIS_FACTURACION.P_LISTA_GLOSAS_ERGP(:v_pnit,
																				:v_pfactura,
																				:v_pfechaini,
																				:v_pfechafin,
																				:v_pvalormin,
																				:v_pvalormax,
																				:v_pestado,
																				:v_json_out,
																				:v_result); end;');
    oci_bind_by_name($consulta, ':v_pnit', $v_pnit);
    oci_bind_by_name($consulta, ':v_pfactura', $v_pfactura);
    oci_bind_by_name($consulta, ':v_pfechaini', $v_pfechaini);
    oci_bind_by_name($consulta, ':v_pfechafin', $v_pfechafin);
    oci_bind_by_name($consulta, ':v_pvalormin', $v_pvalormin);
    oci_bind_by_name($consulta, ':v_pvalormax', $v_pvalormax);
    oci_bind_by_name($consulta, ':v_pestado', $v_pestado);
    oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
    $curs3 = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":v_result", $curs3, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs3);

    ///
    // $consulta = oci_parse($c, 'begin PQ_GENESIS_PRUEBAS_SP.p_lista_facturas_eref(:v_pdocumento,:v_pfechaini,:v_pfechafin,:v_presponsable,:v_pestado,:v_json_out,:v_json_resumen,:v_result); end;');
    // oci_bind_by_name($consulta, ':v_pdocumento', $doc);
    // oci_bind_by_name($consulta, ':v_pfechaini', $fecha_i);
    // oci_bind_by_name($consulta, ':v_pfechafin', $fecha_f);
    // oci_bind_by_name($consulta, ':v_presponsable', $ced);
    // oci_bind_by_name($consulta, ':v_pestado', $estado);
    // oci_bind_by_name($consulta, ':v_json_out', $json, 4000);
    // oci_bind_by_name($consulta, ':v_json_resumen', $json2, 4000);
    // $curs = oci_new_cursor($c);
    // oci_bind_by_name($consulta, ":v_result", $curs, -1, OCI_B_CURSOR);
    // oci_execute($consulta);
    // oci_execute($curs);

    //
  
    while (($row = oci_fetch_array($curs3, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
        echo "<tbody>";
        echo "<tr>";
        echo "<td>". $row["ANOO"]."</td>";
        echo "<td>". $row["CODIGO_GLOSA"]."</td>";
        echo "<td>". $row["DOCUMENTO_FD"]."</td>";
        echo "<td>". $row["DOCUMENTO_FS"]."</td>";
        echo "<td>". $row["ESTADO_FD"]."</td>";
        echo "<td>". $row["FACTURA"]."</td>";
        echo "<td>". $row["FECHA_FS"]."</td>";
        echo "<td>". $row["FECHA_GLOSA"]."</td>";
        echo "<td>". $row["GLOSA"]."</td>";
        echo "<td>". $row["NIT"]."</td>";
        echo "<td>". $row["NOMBRE"]."</td>";
        echo "<td>". $row["NUMERO_FD"]."</td>";
        echo "<td>". $row["NUMERO_FS"]."</td>";
        echo "<td>". $row["OBSERVACION"]."</td>";
        echo "<td>". $row["PERIODO"]."</td>";
        echo "<td>". $row["RAZON"]."</td>";
        echo "<td>". $row["RECIBO"]."</td>";
        echo "<td>". $row["SERVICIO"]."</td>";
        echo "<td>". $row["TOTAL_FD"]."</td>";
        echo "<td>". $row["TOTAL_FS"]."</td>";
        echo "<td>". $row["TOTAL_SERVICIO"]."</td>";
        echo "<td>". $row["UBICACION_FD"]."</td>";
        echo "<td>". $row["UBICACION_FS"]."</td>";
        echo "<td>". $row["VALOR_GLOSA"]."</td>";
      
        echo "</tr>";
        echo "</tbody>";

    }

    oci_close($c);
}

?>
</table>