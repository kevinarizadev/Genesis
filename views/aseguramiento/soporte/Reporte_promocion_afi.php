<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=Reporte Avanzado de Promocion afi - " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");


$tipo_gestion = 'G';
$fehca_inicio = $_GET['fehca_inicio'];
$fecha_fin = $_GET['fecha_fin'];
$documento = $_GET['documento'];

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
    <th>TIPO DOCUMENTO</th>
    <th>NUMERO</th>
   <!--  <th>NOMBRE</th>
    <th>FECHA NACIMIENTO</th>
    <th>SEXO</th>
    <th>TIPO SANGRE</th>-->
    <th>TIPO GESTION</th>     
    <th>FECHA MODIFICADO</th>
    <th>ESTADO</th>
    <th>RESPONSABLE</th>
    <th>NRESPONSABLE</th>
    <th>MUNICIPIO</th>
    <th>DEPARTAMENTO</th>
   <th>CODIGO SAT</th>
    <th>BDUA</th>
    <th>LMA</th>
    <th>GLOSA</th>
    <th>EVO_DOC</th>
    <th>F_EVO_DOC</th> 
    </tr>
    <?php
    $consulta = oci_parse($c, 'BEGIN oasis.pq_eafp_productividad_gestor.p_mostrar_datos_2(:p_tipog,:p_finicio,:p_ffinal,:p_documento,:v_json_row); end;');
	oci_bind_by_name($consulta, ':p_tipog', $tipo_gestion);
	oci_bind_by_name($consulta, ':p_finicio', $fehca_inicio);
	oci_bind_by_name($consulta, ':p_ffinal', $fecha_fin);
	oci_bind_by_name($consulta, ':p_documento', $documento);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    $json = $clob->read($clob->size());
    $datos = json_decode($json);

    foreach  ($datos as $row) {
        echo "<tr>";
        echo "<td>";
        echo $row->TIPODOCUMENTO;
        echo "</td>";
        echo "<td>";
        echo $row->DOCUMENTO;
        echo "</td>";
        // echo "<td>";
        // echo $row->NOMBRE1.''.$row->NOMBRE2.''.$row->APELLIDO1.''.$row->APELLIDO2;
        // echo "</td>";
        // echo "<td>";
        // echo $row->FNACIMIENTO;
        // echo "</td>";
        // echo "<td>";
        // echo $row->SEXO;
        // echo "</td>";
        // echo "<td>";
        // echo $row->TSANGREE;
        // echo "</td>";
        // echo "<td>";
        // echo $row->FRH;
        // echo "</td>";
        // echo "<td>";
        // echo $row->CONDICION_SALUD;
        // echo "</td>";
        // echo "<td>";
        // echo $row->NDEPARTAMENTO;
        // echo "</td>";
        // echo "<td>";
        // echo $row->NMUNICIPIO;
        // echo "</td>";
        echo "<td>";
        echo $row->TIPOGESTION;
        echo "</td>";
         echo "<td>";
        echo $row->FMODIFICADO;
        echo "</td>"; 
         echo "<td>";
        echo $row->ESTADO;
        echo "</td>"; 
         echo "<td>";
        echo $row->REPONSABLE;
        echo "</td>";
        echo "<td>";
        echo $row->NREPONSABLE;
        echo "</td>";
        echo "<td>";
        echo $row->MUNICIPIO_REPONSABLE;
        echo "</td>";
        echo "<td>";
        echo $row->DPTO_REPONSABLE;
        echo "</td>";
        echo "<td>";
        echo $row->CODIGO_SAT;
        echo "</td>";
         echo "<td>";
        echo $row->BDUA;
        echo "</td>";
        echo "<td>";
        echo $row->LMA;
        echo "</td>";        
        echo "<td>";
        echo $row->GLOSA;
        echo "</td>";        
        echo "<td>";
        echo $row->EVO_DOC;
        echo "</td>";        
        echo "<td>";
        echo $row->F_EVO_DOC;
        echo "</td>";        
        echo "</tr>";
    }

    oci_close($c);
    ?>

</table>