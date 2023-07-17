<?php
require_once('../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Solicitudes Autorizaciones - " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$fehca_inicio = $_GET['fecha_inicio'];
$fecha_fin = $_GET['fecha_fin'];
$tipodescargar = $_GET['tipo_descargar'];

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
    <th>numero_solicitud</th>
    <th>estado</th>
    <th>fecha_solicitud</th>
    <th>fecha_gestion</th>
    <th>Diferencia de Dias</th>
    <th>autorizacion</th>
    <th>documento_afiliado</th>
    <th>nombre_afiliado</th>
    <th>observacion</th>
    <th>regimen</th>
    <th>portabilidad</th>
    <th>justificacion_anulacion</th>
    <th>responsable_gestion</th>
    <th>departamento</th>
    <th>Municipio</th>
    </tr>
    <?php

    if($tipodescargar == 1){
    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.gestion_procesadas(:p_vfechaini,:p_vfechafin,:p_json_out); end;');
    oci_bind_by_name($consulta,':p_vfechaini',$fehca_inicio);
    oci_bind_by_name($consulta,':p_vfechafin',$fecha_fin);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':p_json_out', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    $json = $clob->read($clob->size());
    $datos = json_decode($json);
    foreach  ($datos as $row) {
        echo "<tr>";
        echo "<td>";
        echo $row->numero_solicitud;
        echo "</td>";
        echo "<td>";
        echo $row->estado;
        echo "</td>";
        echo "<td>";
        echo $row->fecha_solicitud;
        echo "</td>";
        echo "<td>";
        echo $row->fecha_gestion;
        echo "</td>";
        echo "<td>";
        echo $row->diferencia_dias;
        echo "</td>";
        echo "<td>";
        echo $row->autorizacion;
        echo "</td>";
        echo "<td>";
        echo $row->documento_afiliado;
        echo "</td>";
        echo "<td>";
        echo $row->nombre_afiliado;
        echo "</td>";
        echo "<td>";
        echo $row->observacion;
        echo "</td>";
        echo "<td>";
        echo $row->regimen;
        echo "</td>";
        echo "<td>";
        echo $row->portabilidad;
        echo "</td>";
        echo "<td>";
        echo $row->justificacion_anulacion;
        echo "</td>";
        echo "<td>";
        echo $row->responsable_gestion;
        echo "</td>"; 
         echo "<td>";
        echo $row->departamento;
        echo "</td>";       
        echo "<td>";
        echo $row->municipio;
        echo "</td>";       
        echo "</tr>";
    }

    oci_close($c);
    } elseif ($tipodescargar == 2){
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.gestion_rechazadas(:p_vfechaini,:p_vfechafin,:p_json_out); end;');
        oci_bind_by_name($consulta,':p_vfechaini',$fehca_inicio);
        oci_bind_by_name($consulta,':p_vfechafin',$fecha_fin);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':p_json_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        $json = $clob->read($clob->size());
        $datos = json_decode($json);
        foreach  ($datos as $row) {
              echo "<tr>";
        echo "<td>";
        echo $row->numero_solicitud;
        echo "</td>";
        echo "<td>";
        echo $row->estado;
        echo "</td>";
        echo "<td>";
        echo $row->fecha_solicitud;
        echo "</td>";
        echo "<td>";
        echo $row->fecha_gestion;
        echo "</td>";
        echo "<td>";
        echo $row->diferencia_dias;
        echo "</td>";
        echo "<td>";
        echo $row->autorizacion;
        echo "</td>";
        echo "<td>";
        echo $row->documento_afiliado;
        echo "</td>";
        echo "<td>";
        echo $row->nombre_afiliado;
        echo "</td>";
        echo "<td>";
        echo $row->observacion;
        echo "</td>";
        echo "<td>";
        echo $row->regimen;
        echo "</td>";
        echo "<td>";
        echo $row->portabilidad;
        echo "</td>";
        echo "<td>";
        echo $row->justificacion_anulacion;
        echo "</td>";
        echo "<td>";
        echo $row->responsable_gestion;
        echo "</td>";
         echo "<td>";
        echo $row->departamento;
        echo "</td>";     
        echo "<td>";
        echo $row->municipio;
        echo "</td>";       
        echo "</tr>";
        }

    oci_close($c);
    } elseif ($tipodescargar == 3){
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.g_no_req_aut(:p_vfechaini,:p_vfechafin,:p_json_out); end;');
        oci_bind_by_name($consulta,':p_vfechaini',$fehca_inicio);
        oci_bind_by_name($consulta,':p_vfechafin',$fecha_fin);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':p_json_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        $json = $clob->read($clob->size());
        $datos = json_decode($json);
        foreach  ($datos as $row) {
              echo "<tr>";
        echo "<td>";
        echo $row->numero_solicitud;
        echo "</td>";
        echo "<td>";
        echo $row->estado;
        echo "</td>";
        echo "<td>";
        echo $row->fecha_solicitud;
        echo "</td>";
        echo "<td>";
        echo $row->fecha_gestion;
        echo "</td>";
        echo "<td>";
        echo $row->diferencia_dias;
        echo "</td>";
        echo "<td>";
        echo $row->autorizacion;
        echo "</td>";
        echo "<td>";
        echo $row->documento_afiliado;
        echo "</td>";
        echo "<td>";
        echo $row->nombre_afiliado;
        echo "</td>";
        echo "<td>";
        echo $row->observacion;
        echo "</td>";
        echo "<td>";
        echo $row->regimen;
        echo "</td>";
        echo "<td>";
        echo $row->portabilidad;
        echo "</td>";
        echo "<td>";
        echo $row->justificacion_anulacion;
        echo "</td>";
        echo "<td>";
        echo $row->responsable_gestion;
        echo "</td>";  
         echo "<td>";
        echo $row->departamento;
        echo "</td>";      
        echo "<td>";
        echo $row->municipio;
        echo "</td>";       
        echo "</tr>";
        }

    oci_close($c);
    } elseif ($tipodescargar == 4){
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.cantidad_pendiente(:p_vfechaini,:p_vfechafin,:v_pcantidad); end;');
        oci_bind_by_name($consulta,':p_vfechaini',$fehca_inicio);
        oci_bind_by_name($consulta,':p_vfechafin',$fecha_fin);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pcantidad', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        $json = $clob->read($clob->size());
        $datos = json_decode($json);
        foreach  ($datos as $row) {
              echo "<tr>";
        echo "<td>";
        echo $row->numero_solicitud;
        echo "</td>";
        echo "<td>";
        echo $row->estado;
        echo "</td>";
        echo "<td>";
        echo $row->fecha_solicitud;
        echo "</td>";
        echo "<td>";
        echo $row->fecha_gestion;
        echo "</td>";
        echo "<td>";
        echo $row->diferencia_dias;
        echo "</td>";
        echo "<td>";
        echo $row->autorizacion;
        echo "</td>";
        echo "<td>";
        echo $row->documento_afiliado;
        echo "</td>";
        echo "<td>";
        echo $row->nombre_afiliado;
        echo "</td>";
        echo "<td>";
        echo $row->observacion;
        echo "</td>";
        echo "<td>";
        echo $row->regimen;
        echo "</td>";
        echo "<td>";
        echo $row->portabilidad;
        echo "</td>";
        echo "<td>";
        echo $row->justificacion_anulacion;
        echo "</td>";
        echo "<td>";
        echo $row->responsable_gestion;
        echo "</td>";  
         echo "<td>";
        echo $row->departamento;
        echo "</td>";      
        echo "<td>";
        echo $row->municipio;
        echo "</td>";       
        echo "</tr>";
        }

    oci_close($c);
    } elseif ($tipodescargar == 5){
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_TIC.gestion_total(:p_vfechaini,:p_vfechafin,:p_json_out); end;');
        oci_bind_by_name($consulta,':p_vfechaini',$fehca_inicio);
        oci_bind_by_name($consulta,':p_vfechafin',$fecha_fin);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':p_json_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        $json = $clob->read($clob->size());
        $datos = json_decode($json);
        foreach  ($datos as $row) {
              echo "<tr>";
        echo "<td>";
        echo $row->numero_solicitud;
        echo "</td>";
        echo "<td>";
        echo $row->estado;
        echo "</td>";
        echo "<td>";
        echo $row->fecha_solicitud;
        echo "</td>";
        echo "<td>";
        echo $row->fecha_gestion;
        echo "</td>";
        echo "<td>";
        echo $row->diferencia_dias;
        echo "</td>";
        echo "<td>";
        echo $row->autorizacion;
        echo "</td>";
        echo "<td>";
        echo $row->documento_afiliado;
        echo "</td>";
        echo "<td>";
        echo $row->nombre_afiliado;
        echo "</td>";
        echo "<td>";
        echo $row->observacion;
        echo "</td>";
        echo "<td>";
        echo $row->regimen;
        echo "</td>";
        echo "<td>";
        echo $row->portabilidad;
        echo "</td>";
        echo "<td>";
        echo $row->justificacion_anulacion;
        echo "</td>";
        echo "<td>";
        echo $row->responsable_gestion;
        echo "</td>";    
         echo "<td>";
        echo $row->departamento;
        echo "</td>";    
        echo "<td>";
        echo $row->municipio;
        echo "</td>";       
        echo "</tr>";
        }

    oci_close($c);
    }


    ?>

</table>