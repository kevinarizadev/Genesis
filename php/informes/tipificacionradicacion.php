<?php
require_once('../config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Tipificacion Radicacion"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");

$annos = $_GET['anno'];
$periodo = $_GET['periodo'];

$consulta = oci_parse($c," SELECT sum(f.facv_total_proveedor) TOTAL,
 count(1) CANTIDAD,
case when t.terc_marca_cuentas = 'S' and f.facv_total_proveedor >= 500000 then 'PAQUETE_MAYOR_VALOR'
      when t.terc_marca_cuentas = 'S' and f.facv_total_proveedor < 500000 then 'PAQUETE_MENOR_VALOR'
      when f.facv_total_proveedor <=500000 AND t.terc_marca_cuentas IS NULL then 'MENOR O IGUAL A 500 MIL'
      when f.facv_total_proveedor > 500000 AND t.terc_marca_cuentas IS NULL then 'MAYOR A 500 MIL'
 END TIPO
from ofac_factura f
inner join bter_tercero t on t.terv_codigo = f.facv_tercero
where to_char(f.fach_hora,'mm') = :periodo
and to_char(f.fach_hora,'yyyy') = :anno
and f.facc_documento = 'FS'
and f.facc_concepto <> 'PF'
and f.facc_estado <>'X'
GROUP BY
 case when t.terc_marca_cuentas = 'S' and f.facv_total_proveedor >= 500000 then 'PAQUETE_MAYOR_VALOR'
      when t.terc_marca_cuentas = 'S' and f.facv_total_proveedor < 500000 then 'PAQUETE_MENOR_VALOR'
      when f.facv_total_proveedor <=500000 AND t.terc_marca_cuentas IS NULL then 'MENOR O IGUAL A 500 MIL'
      when f.facv_total_proveedor > 500000 AND t.terc_marca_cuentas IS NULL then 'MAYOR A 500 MIL'
 END");

oci_bind_by_name($consulta,':anno',$annos);
oci_bind_by_name($consulta,':periodo',$periodo);

?>

<h1>Tipificacion Radicacion</h1>
<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
<tr>
<th>TOTAL</th>
<th>CANTIDAD</th>
<th>TIPO</th>
</tr>
<?php

oci_execute($consulta);
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
echo "<tr>";
echo "<td>"; echo $rows['TOTAL']; echo "</td>";
echo "<td>"; echo $rows['CANTIDAD']; echo "</td>";
echo "<td>"; echo $rows['TIPO']; echo "</td>";

echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
