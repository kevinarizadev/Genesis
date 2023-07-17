
<?php
require_once('../../php/config/dbcon_prod.php');

header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=CONSULTA DE CAPACIDAD UCI- " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");
?>

<table cellspacing="0" cellpadding="0" border="1" align="center">
  

    <tr>
        <th align='center'>NIT</th>
        <th align='center'>SALA</th>        
        <th align='center'>CODIGO</th>  
        <th align='center'>CAPACIDAD</th>        
        <th align='center'>CANTIDAD_CENSO</th>        
        <th align='center'>CANTIDAD_OTRAS_EPS</th>
        <th align='center'>OCUPACION</th>
        <th align='center'>COD_CLASIFICACION</th>        
        <th align='center'>SEDE</th>
        <th align='center'>NOMBRESEDE</th> 
    </tr>

    <?php
   
   $cursor = oci_new_cursor($c);
   $consulta = oci_parse($c,'begin
  -- Call the procedure
  oasis.pq_genesis_ch.p_consolidado_uci_new(:v_response);
end;');
   oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
        
        oci_execute($consulta);
        oci_execute($cursor, OCI_DEFAULT);
        $datos = null;
        oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
        oci_free_statement($consulta);
        oci_free_statement($cursor);



		
		


    // $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_SINIESTRO.p_descarga_gestante(:v_pfecha1,:v_pfecha2,:v_pjson_row_out); end;');
    // oci_bind_by_name($consulta, ':v_pfecha1', $fecha_i);
    // oci_bind_by_name($consulta, ':v_pfecha2', $fecha_f);
    // $clob = oci_new_descriptor($c, OCI_D_LOB);
	// oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
	// oci_execute($consulta, OCI_DEFAULT);
    //echo $json;

  /*  $datos=json_decode($json);
       echo gettype($datos);*/
     //  var_dump( json_decode(json_encode($datos)));
          
    foreach ($datos as $dato) {
      echo "<tr>";


        ////////////
        echo "<td>";
        echo $dato['NIT'];
        echo "</td>";

        ////////////
        echo "<td>";
        echo $dato['SALA'];
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato['CODIGO'];
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato['CAPACIDAD'];
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato['CANTIDAD_CENSO'];
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato['CANTIDAD_OTRAS_EPS'];
        echo "</td>";
        ////////////
        // echo "<td>";
        // echo $dato['CONC_NOMBRE'];
        // echo "</td>";
        ////////////
                ////////////
                echo "<td>";
                echo $dato['OCUPACION'];
                echo "</td>";
                ///////
        echo "<td>";
        echo $dato['COD_CLASIFICACION'];
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato['SEDE'];
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato['NOMBRESEDE'];
        echo "</td>";    


    }
    oci_close($c);
    ?>
</table>