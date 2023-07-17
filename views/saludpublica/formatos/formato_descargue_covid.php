<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename= DATOS BASICOS (PLAN DE VACUNACION)- " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$nit = $_GET['nit'];
$fase = $_GET['fase'];
$responsable = $_GET['responsable'];
$ubicacion = $_GET['ubicacion'];

?>

<!-- <table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
    <th colspan="9">Datos basicos</th>
    <th colspan="7">Seguimiento de gestante</th>
    <th colspan="10">Patologias</th>
    <th colspan="13">Demanda inducida</th>    
    <th colspan="2">Factores de riesgo</th> -->


<table cellspacing="0" cellpadding="0" border="1" align="center">


    <tr>

        <th class="center-align">TIPO DE DOCUMENTO</th>
        <th class="center-align">DOCUMENTO</th>
        <th class="center-align">NOMBRE</th>
        <th class="center-align">DEPARTAMENTO</th>
        <th class="center-align">MUNICIPIO</th>
        <th class="center-align">TELEFONO</th>
        <th class="center-align">CELULAR</th>
        <th class="center-align">CELULAR 2</th>
        <th class="center-align">CORREO</th>
        <th class="center-align">DIRECCION</th>
        <th class="center-align">BARRIO</th>
        <th class="center-align">FASE</th>




    </tr>
    <?php


    $consulta = oci_parse($c, 'BEGIN pq_genesis_salud_publica.p_descarga_registro(:v_pnit,
                                                                                    :v_pfase,
                                                                                    :v_presponsable,
                                                                                    :v_pubicacion,
                                                                                    :v_pjson_row_out); end;');
    oci_bind_by_name($consulta, ':v_pnit', $nit);
    oci_bind_by_name($consulta, ':v_pfase', $fase);
    oci_bind_by_name($consulta, ':v_presponsable', $responsable);
    oci_bind_by_name($consulta, ':v_pubicacion', $ubicacion);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);


    $datos = json_decode($clob->read($clob->size()));

    foreach ($datos as $dato) {
        echo "<tr>";

        ////////////
        echo "<td>";
        echo $dato->TIPO_DOCUMENTO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->NUM_DOCUMENTO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->NOMBRE_AFILIADO;
        echo "</td>";
         ////////////
        echo "<td>";
        echo $dato->DEPARTAMENTO;
        echo "</td>";
         ////////////
        echo "<td>";
        echo $dato->MUNICIPIO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->TELEFONO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->CELULAR1;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->CELULAR2;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->CORREO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->DIRECCION;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->BARRIO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->FASE;
        echo "</td>";
    }

    oci_close($c);
    ?>
</table>