<?php
require_once('../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=REPORTE REVISION"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");
$fecha_inicio = $_GET['fecha_inicio'];
$fecha_fin = $_GET['fecha_fin'];
$seccional = 0;
?>
<h1>REPORTE REVISION</h1>
<table cellspacing="0" cellpadding="0"  border="1" align="center">
          <tr>
                <th>RESPONSABLE REVISION</th>
                <th>RESP_CARGUE</th>
                <th>RESP_CARGUE_UBICA</th>
                <th>FECHA DE CARGUE</th>
                <th>SOPORTE</th>
                <th>FECHA_REVISION</th>
                <th>MOTIVO_RECHAZO</th>
                <th>TIPO_DOC_AFILIADO</th>
                <th>AFILIADO</th>
                <th>ESTADO</th>
                <th>AFIC_NOMBRE</th>
                <th>DEPTO_AFIL</th>
                <th>MUNICIPIO_AFIL</th>
                <th>FECHA_NAC</th>
                <th>SEXO</th>
                <th>FECHA AFILIACION</th>
                <th>REGIMEN</th>
                <th>DIRECCION</th>
                <th>MET_GRUPO_POB</th>
                <th>GRUPO_POB</th>
                <th>FICHA_SISBEN</th>
                <th>PUNTAJE_SISBEN</th>
                <th>NIVEL_SISBEN</th>
                <th>GRUPO_SISBEN</th>
                <th>SUBGRUPO_SISBEN</th>
                <th>CAUSAL_OFICIO</th>
                <th>TIPO_DOC_CABEZA</th>
                <th>DOCUMENTO_CABEZA</th>
                <th>NOMBRE_CABEZA</th>
          </tr>
<?php
  $consulta = oci_parse($c, 'begin pq_genesis_digital.p_obtener_informe_cantidad_funcionario(:v_departamento,:v_fecha_inicial,:v_fecha_final,:v_json_res); end;');
  oci_bind_by_name($consulta,':v_departamento',$seccional);
	oci_bind_by_name($consulta,':v_fecha_inicial',$fecha_inicio);
	oci_bind_by_name($consulta,':v_fecha_final',$fecha_fin);
  $curs = oci_new_cursor($c);
  oci_bind_by_name($consulta, ":v_json_res", $curs, -1, OCI_B_CURSOR);
  oci_execute($consulta);
  oci_execute($curs);


  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false)
{
          echo "<tr>";

                        echo "<td>"; echo$row['FUNCIONARIO']; echo "</td>";
                        echo "<td>"; echo$row['RESP_CARGUE']; echo "</td>";
                          echo "<td>"; echo$row['RESP_CARGUE_UBICA']; echo "</td>";
                        echo "<td>"; echo$row['FECHA']; echo "</td>";
                        echo "<td>"; echo$row['SOPORTE']; echo "</td>";
                        echo "<td>"; echo$row['FECHA_REV']; echo "</td>";
                        echo "<td>"; echo$row['NOM_RECHAZO']; echo "</td>";
                        echo "<td>"; echo$row['SDCC_TIPO_DOC_AFILIADO']; echo "</td>";
                        echo "<td>"; echo$row['SDCC_AFILIADO']; echo "</td>";
                        echo "<td>"; echo$row['SDCC_ESTADO']; echo "</td>";
                        echo "<td>"; echo$row['AFIC_NOMBRE']; echo "</td>";
                        echo "<td>"; echo$row['DEPTO_AFIL']; echo "</td>";
                        echo "<td>"; echo$row['MUNICIPIO_AFIL']; echo "</td>";
                        echo "<td>"; echo$row['FECHA_NAC']; echo "</td>";
                        echo "<td>"; echo$row['SEXO']; echo "</td>";
                        echo "<td>"; echo$row['F_AFIL']; echo "</td>";
                        echo "<td>"; echo$row['REGIMEN']; echo "</td>";
                        echo "<td>"; echo$row['DIRECCION']; echo "</td>";
                        echo "<td>"; echo$row['MET_GRUPO_POB']; echo "</td>";
                        echo "<td>"; echo$row['GRUPO_POB']; echo "</td>";
                        echo "<td>"; echo$row['FICHA_SISBEN']; echo "</td>";
                        echo "<td>"; echo$row['PUNTAJE_SISBEN']; echo "</td>";
                        echo "<td>"; echo$row['NIVEL_SISBEN']; echo "</td>";
                        echo "<td>"; echo$row['GRUPO_SISBEN']; echo "</td>";
                        echo "<td>"; echo$row['SUBGRUPO_SISBEN']; echo "</td>";
                        echo "<td>"; echo$row['CAUSAL_OFICIO']; echo "</td>";
                        echo "<td>"; echo$row['TIPO_DOC_CABEZA']; echo "</td>";
                        echo "<td>"; echo$row['TIPO_CABEZA']; echo "</td>";
                        echo "<td>"; echo$row['NOM_CABEZA']; echo "</td>";


        echo "</tr>";
 }
oci_close($c);

?>