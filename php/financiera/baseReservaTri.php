<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
$ano         = $_GET['panno'];
$periodo     = $_GET['pperiodo'];
$base        = $_GET['pbase'];
$consulta    = $_GET['pconsulta_triangulo'];
$consulta    = $consulta .'and triangulo = :v_ptriangulo and anno = :v_panno and periodo = :v_pperiodo order by iteracion';
//var_dump($_GET);

header('Content-type: application/vnd.ms-excel; charset=UTF-8');
header("Content-Disposition: attachment; filename=Base_Reserva_".$base.".xls");
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

echo "<Worksheet ss:Name=\"Base\">
     <Table>";

echo "<Row ss:StyleID=\"1\">".
    "<Cell><Data ss:Type=\"String\">Triangulo Obligaciones Conocidas en Reserva</Data></Cell>".
    "</Row>";

echo "<Row ss:StyleID=\"1\">".
     "<Cell><Data ss:Type=\"String\">0</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">1</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">2</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">3</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">4</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">5</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">6</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">7</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">8</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">9</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">10</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">11</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">12</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">13</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">14</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">15</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">16</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">17</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">18</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">19</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">20</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">21</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">22</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">23</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">24</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">25</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">26</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">27</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">28</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">29</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">30</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">31</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">32</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">33</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">34</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">35</Data></Cell>".
     "<Cell><Data ss:Type=\"Number\">36</Data></Cell>".
     "</Row>";

$query = oci_parse($c,$consulta);
oci_bind_by_name($query,':v_panno',$ano);
oci_bind_by_name($query,':v_pperiodo',$periodo);
oci_bind_by_name($query,':v_ptriangulo',$base);
oci_execute($query);
echo $consulta;
while($rows = oci_fetch_assoc($query))
{

  $fecha1 = utf8_encode($rows['FECHA_1']);
  $VAL_01 = utf8_encode($rows['VAL_01']);
  $VAL_02 = utf8_encode($rows['VAL_02']);
  $VAL_03 = utf8_encode($rows['VAL_03']);
  $VAL_04 = utf8_encode($rows['VAL_04']);
  $VAL_05 = utf8_encode($rows['VAL_05']);
  $VAL_06 = utf8_encode($rows['VAL_06']);
  $VAL_07 = utf8_encode($rows['VAL_07']);
  $VAL_08 = utf8_encode($rows['VAL_08']);
  $VAL_09 = utf8_encode($rows['VAL_09']);
  $VAL_10 = utf8_encode($rows['VAL_10']);
  $VAL_11 = utf8_encode($rows['VAL_11']);
  $VAL_12 = utf8_encode($rows['VAL_12']);
  $VAL_13 = utf8_encode($rows['VAL_13']);
  $VAL_14 = utf8_encode($rows['VAL_14']);
  $VAL_15 = utf8_encode($rows['VAL_15']);
  $VAL_16 = utf8_encode($rows['VAL_16']);
  $VAL_17 = utf8_encode($rows['VAL_17']);
  $VAL_18 = utf8_encode($rows['VAL_18']);
  $VAL_19 = utf8_encode($rows['VAL_19']);
  $VAL_20 = utf8_encode($rows['VAL_20']);
  $VAL_21 = utf8_encode($rows['VAL_21']);
  $VAL_22 = utf8_encode($rows['VAL_22']);
  $VAL_23 = utf8_encode($rows['VAL_23']);
  $VAL_24 = utf8_encode($rows['VAL_24']);
  $VAL_25 = utf8_encode($rows['VAL_25']);
  $VAL_26 = utf8_encode($rows['VAL_26']);
  $VAL_27 = utf8_encode($rows['VAL_27']);
  $VAL_28 = utf8_encode($rows['VAL_28']);
  $VAL_29 = utf8_encode($rows['VAL_29']);
  $VAL_30 = utf8_encode($rows['VAL_30']);
  $VAL_31 = utf8_encode($rows['VAL_31']);
  $VAL_32 = utf8_encode($rows['VAL_32']);
  $VAL_33 = utf8_encode($rows['VAL_33']);
  $VAL_34 = utf8_encode($rows['VAL_34']);
  $VAL_35 = utf8_encode($rows['VAL_35']);
  $VAL_36 = utf8_encode($rows['VAL_36']);

  //comienzo a crear las filas con los datos de la BD
  echo "<Row ss:StyleID=\"1\">".
	 	   "<Cell><Data ss:Type=\"String\">$fecha1</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_01</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_02</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_03</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_04</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_05</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_06</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_07</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_08</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_09</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_10</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_11</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_12</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_13</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_14</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_15</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_16</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_17</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_18</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_19</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_20</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_21</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_22</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_23</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_24</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_25</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_26</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_27</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_28</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_29</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_30</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_31</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_32</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_33</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_34</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_35</Data></Cell>".
       "<Cell><Data ss:Type=\"String\">$VAL_36</Data></Cell>".
       "</Row>";

 }

 echo "</Table>
       </Worksheet>
       </Workbook>";

 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
