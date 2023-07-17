<?php
require_once('dbcon.php');
$Area = 'GENESIS';
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=" . $Area . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

function stripAccents($str) {
  return strtr(utf8_decode($str), utf8_decode('àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ'), 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY');
}
?>



<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>EMPLEADOR</th>
        <th>AREA</th>
        <th>CARGO</th>
        <th>TIPO DOCUMENTO</th>
        <th>DOCUMENTO</th>
        <th>PRIMER APELLIDO</th>
        <th>SEGUNDO APELLIDO</th>
        <th>PRIMER NOMBRE</th>
        <th>SEGUNDO NOMBRE</th>
        <th>NOMBRE COMPLETO</th>
        <th>MODULO</th>
        <th>ACCESO</th>
    </tr>

    <?php

    global $request;
    $cursor = oci_new_cursor($c);
    $consulta = oci_parse($c,'begin PQ_GENESIS_ENCUESTA.PERMISOS(:V_PAREA,:V_PJSON); end;');
    oci_bind_by_name($consulta,':V_PAREA',$Area);
    $curs = oci_new_cursor($c);
    oci_bind_by_name($consulta, ":V_PJSON", $curs, -1, OCI_B_CURSOR);
    oci_execute($consulta);
    oci_execute($curs);

    while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false) {
      $modulos = json_decode($row['JSON']->load());

        foreach ($modulos as $i){
          $options = $i->options;
          foreach ($options as $j){
            echo "<tr>";
            echo "<td>";echo stripAccents($row['EMPC_NOMBRE']);echo "</td>";
            echo "<td>";echo stripAccents($row['AREC_NOMBRE']);echo "</td>";
            echo "<td>";echo stripAccents($row['CARC_NOMBRE']);echo "</td>";
            echo "<td>";echo stripAccents($row['TERC_TIPO_TERCERO']);echo "</td>";
            echo "<td>";echo stripAccents($row['TERV_CODIGO']);echo "</td>";
            echo "<td>";echo stripAccents($row['TERC_PRIMER_APELLIDO']);echo "</td>";
            echo "<td>";echo stripAccents($row['TERC_SEGUNDO_APELLIDO']);echo "</td>";
            echo "<td>";echo stripAccents($row['TERC_PRIMER_NOMBRE']);echo "</td>";
            echo "<td>";echo stripAccents($row['TERC_SEGUNDO_NOMBRE']);echo "</td>";
            echo "<td>";echo stripAccents($row['TERC_NOMBRE']);echo "</td>";
            echo "<td>";echo stripAccents($j->titulo);echo "</td>";
            echo "<td>";echo stripAccents($row['ACCESO_TOTAL']);echo "</td>";
            echo "</tr>";
            // echo $j->titulo;
          }
        }







        // if($row['JSON'] == null){
      //   echo stripAccents($row['TERC_NOMBRE']);
      //   }
        // echo "<tr>";
        // echo "<td>";echo $row['AREC_NOMBRE'];echo "</td>";
        // echo "<td>";echo $row['CARC_NOMBRE'];echo "</td>";
        // echo "<td>";echo $row['TERC_NOMBRE'];echo "</td>";
        // echo "<td>";echo $row['JSON']->load();echo "</td>";
      // print_r(json_decode($row['JSON']->load()));

        // echo "</tr>";
    }

    oci_close($c);
    ?>
</table>
