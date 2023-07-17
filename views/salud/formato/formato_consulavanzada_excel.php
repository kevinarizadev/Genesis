<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=CONSULTA DE CENSO- " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$ubicacion = $_GET['ubicacion'];
$nit = $_GET['nit'];
$responsable = $_GET['responsable'];
$fecha_i = $_GET['fecha_i'];
$fecha_f = $_GET['fecha_f'];
$estado = $_GET['estado'];
$regimen = $_GET['regimen'];

?>

<table cellspacing="0" cellpadding="0" border="1" align="center">
  
    <tr>
<th class="center-align">CENSO</th>
<th class="center-align">TIPO DE IDENTIFICACION</th>
<th class="center-align">IDENTIFICACION</th> 
    <th class="center-align">1ER NOMBRE AFILIADO</th>
    <th class="center-align">2DO NOMBRE AFILIADO</th>
    <th class="center-align">1ER APELLIDO AFILIADO</th>
    <th class="center-align">2DO APELLIDO AFILIADO</th>                              
<th class="center-align">REGIMEN</th>
<th class="center-align">COD. DIAGNOSTICO</th>
<th class="center-align">DIAGNOSTICO</th>

<!-- <th class="center-align">HOSPITALIZACION</th> -->

<th class="center-align">UBICACION PRESTADOR</th>
<th class="center-align">DEPARTAMENTO PRESTADOR</th>
<th class="center-align">MUNICIPIO PRESTADOR</th>
<th class="center-align">NIT</th>
<th class="center-align">PRESTADOR</th>
<th class="center-align">FECHA DE INGRESO</th>
<th class="center-align">FECHA DE EGRESO</th>
<th class="center-align">DIAS DE ESTANCIA</th>
<th class="center-align">TOTAL GLOSAS</th>

<th class="center-align">ESTADO</th>

<th class="center-align">RESPONSABLE</th>
<th class="center-align">FECHA DE REGISTRO</th>
<th class="center-align">NUMERO DE EVOLUCIONES</th>
<th class="center-align">SECCIONAL AFILIADO</th>
<th class="center-align">TIPO DE ESTANCIA</th>
<th class="center-align">CODIGO HABILITACION</th>
<th class="center-align">COD. DIAGNOSTICO EGRESO</th>
<th class="center-align">DIAGNOSTICO EGRESO</th>
<th class="center-align">FECHA ULTIMA NOTA</th>

    </tr>
    <?php
   
   $cursor = oci_new_cursor($c);
   $consulta = oci_parse($c,'begin pq_genesis_censo_hospitalario.p_obtener_censo_avanzado(:v_ubicacion,
																							   :v_nit,
                                                                                               :v_responsable,
                                                                                               :v_fecha_inicio,
                                                                                               :v_fecha_final,
                                                                                               :v_estado,
                                                                                               :v_regimen,
																							   :v_response); end;');
   oci_bind_by_name($consulta,':v_ubicacion',$ubicacion);
   oci_bind_by_name($consulta,':v_nit',$nit);
   oci_bind_by_name($consulta,':v_responsable',$responsable);
   oci_bind_by_name($consulta,':v_fecha_inicio',$fecha_i);
   oci_bind_by_name($consulta,':v_fecha_final',$fecha_f);
   oci_bind_by_name($consulta,':v_estado',$estado);
   oci_bind_by_name($consulta,':v_regimen',$regimen);
   //
   oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
   oci_execute($consulta);
   oci_execute($cursor, OCI_DEFAULT);
   $datos = null;
   oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
   oci_free_statement($consulta);
   oci_free_statement($cursor);

   // echo json_encode($datos);

    // $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_SINIESTRO.p_descarga_gestante(:v_pfecha1,:v_pfecha2,:v_pjson_row_out); end;');
    // oci_bind_by_name($consulta, ':v_pfecha1', $fecha_i);
    // oci_bind_by_name($consulta, ':v_pfecha2', $fecha_f);
    // $clob = oci_new_descriptor($c, OCI_D_LOB);
	// oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
	// oci_execute($consulta, OCI_DEFAULT);
    

    $datos=json_decode(json_encode($datos));
    
    foreach ($datos as $dato) {
        echo "<tr>";


        ////////////
        echo "<td>";
        echo $dato->CENN_NUMERO;
        echo "</td>";

        ////////////
        echo "<td>";
        echo $dato->CENC_TIPO_DOCUMENTO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->CENC_AFILIADO;
        echo "</td>";
        ////////////
         echo "<td>";
    echo $dato->AFIC_PRIMER_NOMBRE;
    echo "</td>";
    ////////////
    echo "<td>";
    echo $dato->AFIC_SEGUNDO_NOMBRE;
    echo "</td>";
    ////////////
    echo "<td>";
    echo $dato->AFIC_PRIMER_APELLIDO;
    echo "</td>";
    ////////////
    echo "<td>";
    echo $dato->AFIC_SEGUNDO_APELLIDO;
    echo "</td>";
    ////////////
        echo "<td>";
        echo $dato->REGIMEN;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->COD_DX;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->DIAC_NOMBRE;
        echo "</td>";
        ////////////

        ////////////
        echo "<td>";
        echo $dato->CENN_UBICACION;
        echo "</td>";
        ///////
        echo "<td>";
        echo $dato->DEPARTAMENTO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->UBGC_NOMBRE;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->NIT;
        echo "</td>";    
        ////////////
        echo "<td>";
        echo $dato->PRESTADOR;
        echo "</td>";        
        ////////////
        echo "<td>";
        echo $dato->CENF_FECHA_INGRESO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->CENF_FECHA_EGRESO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->DIAESTANCIA;
        echo "</td>";        
        ////////////
        echo "<td>";
        echo $dato->CENV_TOTAL;
        echo "</td>";
        ////////////
      
        ////////////
        echo "<td>";
        echo $dato->ESTADO_CENSO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->RESPONSABLE;
        echo "</td>";
    ////////////
        echo "<td>";
        echo $dato->FECHA_REGISTRO;
        echo "</td>";
    ////////////
        echo "<td>";
        echo $dato->NUMERO_EVOLUCION;
        echo "</td>";
    ////////////
        echo "<td>";
        echo $dato->NOM_UBICACION_AFILIADO;
        echo "</td>";
    ////////////
        echo "<td>";
        echo $dato->TIPO_ESTANCIA;
        echo "</td>";
        ////////////
            echo "<td>";
            echo $dato->COD_HABILITACION;
            echo "</td>";
                ////////////

    echo "<td>";
    echo $dato->DX_EG;
    echo "</td>";
    echo "<td>";
    echo $dato->DX_EGRESO;
    echo "</td>";
    echo "<td>";
    echo $dato->FECHA_ULTIMA_NOTA;
    echo "</td>";
    ////////////

    }

    oci_close($c);
    ?>
</table>