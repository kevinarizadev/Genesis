<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename= DATOS BASICOS (PLAN DE VACUNACION)- " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");


$fase = $_GET['fase'];
$etapa = $_GET['etapa'];
$subgrupo = $_GET['subgrupo'];
$ubicacion = $_GET['ubicacion'];

?>



<table cellspacing="0" cellpadding="0" border="1" align="center">


    <tr>
        <th class="center-align">ID</th>
        <th class="center-align">TIPO DE DOCUMENTO</th>
        <th class="center-align">DOCUMENTO</th>
        <th class="center-align">NOMBRE</th>
        <th class="center-align">DIRECCION</th>
        <th class="center-align">TELEFONO</th>
        <th class="center-align">CELULAR</th>
        <th class="center-align">CELULAR 2</th>
        <th class="center-align">CORREO</th>
        <th class="center-align">FASE</th>
        <th class="center-align">ETAPA</th>
        <th class="center-align">SUBGRUPO</th>

        <th class="center-align">DEPARTAMENTO</th>
        <th class="center-align">MUNICIPIO</th>
        <th class="center-align">ZONA</th>
        <th class="center-align">VACUNADO</th>
        <th class="center-align">FECHA DE APLICACION</th>
        <th class="center-align">FECHA DE SEGUNDA VACUNA</th>
        <th class="center-align">CITA DE SEGUNDA VACUNA</th>


    </tr>
    <?php


    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c, 'begin pq_genesis_salud_publica.p_listar_informacion(:v_fase,
                                                                            :v_etapa,
                                                                            :v_subgrupo,
                                                                            :v_ubicacion,
                                                                            :v_response); end;');
    oci_bind_by_name($consulta, ':v_fase', $fase);
    oci_bind_by_name($consulta, ':v_etapa', $etapa);
    oci_bind_by_name($consulta, ':v_subgrupo', $subgrupo);
    oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
    oci_bind_by_name($consulta, ':v_response', $cursor, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($cursor, OCI_DEFAULT);
    $datos = null;
    oci_fetch_all($cursor, $datos, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);
    oci_free_statement($consulta);
    oci_free_statement($cursor);

    $datos = json_decode(json_encode($datos));


    foreach ($datos as $dato) {

        echo "<tr>";

        ////////////
        echo "<td>";
        echo $dato->CODIGO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->TIPO_DOCUMENTO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->NUMERO_DOCUMENTO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->NOMBRE_AFILIADO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->DIRECCION;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->TELEFONO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->CELULAR;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->CELULAR1;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->EMAIL;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->FASE;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->ETAPA;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->SUBGRUPO;
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
        echo $dato->ZONA;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->VACUNADO;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->FECHAAPLICACION;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->FECHASEGUNDAVAC;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->FECHACITASEGUNDAVAC;
        echo "</td>";
        //   var_dump($dato);
    }

    oci_close($c);
    ?>
</table>