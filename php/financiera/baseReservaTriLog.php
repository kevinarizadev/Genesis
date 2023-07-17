<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
$ano          = $_GET['panno'];
$periodo      = $_GET['pperiodo'];
$empresa      = 1;
//var_dump($_GET);

header('Content-type: application/vnd.ms-excel; charset=UTF-8');
header("Content-Disposition: attachment; filename=Base_Reserva_Comentarios.xls");
header("Pragma: no-cache");
header("Expires: 0");

echo "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n".
 "<Workbook xmlns=\"urn:schemas-microsoft-com:office:spreadsheet\"\n".
 "xmlns:x=\"urn:schemas-microsoft-com:office:excel\"\n".
 "xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\"\n".
 "xmlns:html=\"http://www.w3.org/TR/REC-html40\">\n";

echo"<ss:Styles>
      <ss:Style ss:ID=\"1\">
      </ss:Style>
    </ss:Styles>";

echo "<Worksheet ss:Name=\"Resultado\">
     <Table>";

echo "<Row ss:StyleID=\"1\">".
    "<Cell><Data ss:Type=\"String\">Resultado en Reserva</Data></Cell>".
    "</Row>";

echo "<Row ss:StyleID=\"1\">".
     "<Cell><Data ss:Type=\"String\">Triangulo</Data></Cell>".
     "<Cell><Data ss:Type=\"String\">Observacion</Data></Cell>".
     "</Row>";

$consulta = "select observacion, triangulo
from reserva_control_log
where empresa = :v_pempresa
and anno = :v_panno
and periodo = :v_pperiodo
and triangulo in ('1','2','4','5','6','7')
order by consecutivo, triangulo, renglon";

$query = oci_parse($c,$consulta);
oci_bind_by_name($query,':v_pempresa',$empresa);
oci_bind_by_name($query,':v_panno',$ano);
oci_bind_by_name($query,':v_pperiodo',$periodo);
oci_execute($query);
echo $consulta;
while($rows = oci_fetch_assoc($query))
{

  $observacion = utf8_encode($rows['OBSERVACION']);
  $triangulo   = $rows['TRIANGULO'];

  //comienzo a crear las filas con los datos de la BD
  echo "<Row ss:StyleID=\"1\">".
       "<Cell><Data ss:Type=\"String\">$triangulo</Data></Cell>".
	 	   "<Cell><Data ss:Type=\"String\">$observacion</Data></Cell>".
       "</Row>";
 }
 oci_close($c);

 $consulta = "select observacion, triangulo
 from reserva_control_log
 where empresa = :v_pempresa
 and anno = :v_panno
 and periodo = :v_pperiodo
 and triangulo not in ('1','2','4','5','6','7')
 order by consecutivo, triangulo, renglon";

 $query = oci_parse($c,$consulta);
 oci_bind_by_name($query,':v_pempresa',$empresa);
 oci_bind_by_name($query,':v_panno',$ano);
 oci_bind_by_name($query,':v_pperiodo',$periodo);
 oci_execute($query);
 echo $consulta;
 while($rows = oci_fetch_assoc($query))
 {

   $observacion = utf8_encode($rows['OBSERVACION']);
   $triangulo   = $rows['TRIANGULO'];

   //comienzo a crear las filas con los datos de la BD
   echo "<Row ss:StyleID=\"1\">".
       "<Cell><Data ss:Type=\"String\">$triangulo</Data></Cell>".
 	 	   "<Cell><Data ss:Type=\"String\">$observacion</Data></Cell>".
        "</Row>";
  }

 echo "</Table>
       </Worksheet>";
echo   "</Workbook>";

 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
