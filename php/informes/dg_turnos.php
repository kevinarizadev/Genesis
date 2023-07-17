<?php
require_once('../config/dbconsqlserver.php');


$fecha_inicio = $_GET['fecha_inicio'];
$fecha_final = $_GET['fecha_final'];
$oficina=$_GET['oficina'];
// $oficina='08001';
// $fecha_inicio='2018-11-01';
// $fecha_final='2018-11-30';
// echo $fecha_inicio;
// echo $fecha_final;
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=ReporteDigiturno".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");
?>


<h1>REPORTE DIGITURNO <?php echo $oficina?></h1>

<table cellspacing="0" cellpadding="0"  border="1" align="left">

<tr>

     <th>ID_REGISTRO</th>
     <th>TURNO</th>
     <th>DOCUMENTO</th>
     <th>NOMBRES</th>
     <th>FECHA_GEN_TURNO</th>
     <th>FECHA_LLA_AGENTE</th>
     <th>FECHA_FIN_AGENTE</th>
     <th>TIEMPO_GEN_LLA</th>
     <th>TIEMPO_LLA_FIN</th>
     <th>NOM_AGENTE</th>

</tr>


<?php

//Hago la consulta SQL, selecciono todos los datos de usuario


$selectConsolPila= "SELECT  ID_REGISTRO, TURNO, DOCUMENTO, NOMBRES,
CONVERT(VARCHAR(10), FECHA_GEN_TURNO, 103) AS  FECHA_GEN_TURNO,
CONVERT(VARCHAR(10), FECHA_LLA_AGENTE, 103) AS  FECHA_LLA_AGENTE,
CONVERT(VARCHAR(10), FECHA_FIN_AGENTE, 103) AS  FECHA_FIN_AGENTE,
TIEMPO_GEN_LLA, TIEMPO_LLA_FIN, U.PRI_NOMBRE +' '+ U.PRI_APELLIDO AS NOM_AGENTE FROM
(SELECT       DGO.ID_REGISTRO,
                        SUBSTRING(DGO.ID_REGISTRO,1,2)+'-'+SUBSTRING(DGO.ID_REGISTRO,22,3) AS TURNO,
           DGO.TIP_DOCUMENTO +' - '+ DGO.NUM_DOCUMENTO AS DOCUMENTO,
           DGO.NOMBRES +' '+ DGO.APELLIDOS AS NOMBRES,
           DGDA.FEC_REGISTRO AS FECHA_GEN_TURNO,
           DGDP.FEC_REGISTRO AS FECHA_LLA_AGENTE,
           DGDF.FEC_REGISTRO AS FECHA_FIN_AGENTE,
           CONVERT(CHAR(8), DATEADD(ss, DATEDIFF(ss, DGDA.FEC_REGISTRO, DGDP.FEC_REGISTRO), '19000101'), 114) As TIEMPO_GEN_LLA,
           CONVERT(CHAR(8), DATEADD(ss, DATEDIFF(ss, DGDP.FEC_REGISTRO, DGDF.FEC_REGISTRO), '19000101'), 114) As TIEMPO_LLA_FIN,
           DGDP.COD_USUARIO,
                        CASE  WHEN DGO.COD_PREFERENCIAL ='N' THEN 'NP'
WHEN DGO.COD_PREFERENCIAL ='A' THEN 'P'
                                    WHEN DGO.COD_PREFERENCIAL ='D' THEN 'P'
                                    WHEN DGO.COD_PREFERENCIAL ='C' THEN 'P'
                                    WHEN DGO.COD_PREFERENCIAL ='E' THEN 'P' END AS TIPO_PREFERENCIA
FROM          DgTurnoweb..DG_REGISTRO DGO LEFT JOIN DgTurnoweb..DG_DETALLE DGDA On DGO.ID_REGISTRO = DGDA.ID_REGISTRO AND DGDA.COD_ESTADOPER ='A'
                                     LEFT JOIN DgTurnoweb..DG_DETALLE DGDP On DGO.ID_REGISTRO = DGDP.ID_REGISTRO AND DGDP.COD_ESTADOPER ='P'
                                     LEFT JOIN DgTurnoweb..DG_DETALLE DGDF On DGO.ID_REGISTRO = DGDF.ID_REGISTRO AND DGDF.COD_ESTADOPER IN ('F','C')
WHERE        SUBSTRING(DGO.ID_REGISTRO,4,5) ='$oficina'
AND DGO.FEC_REGISTRO BETWEEN '$fecha_inicio' AND '$fecha_final')
 A LEFT JOIN DgTurnoweb..DG_USUARIOS U On A.COD_USUARIO = U.COD_USUARIO
ORDER BY FECHA_GEN_TURNO ASC";

$stmt=sqlsrv_query($conn,$selectConsolPila);


//En caso de Error Optiene el error y lo muestra
if( $stmt === false) {
die( print_r( sqlsrv_errors(), true) );
}

//con un while recorro toda la tabla capturando los registros y
//mostrandolo en un html, creado dinamicamente
while( $rows = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC))
{




      $ID_REGISTRO = $rows['ID_REGISTRO'];
      $TURNO = $rows['TURNO'];
      $DOCUMENTO = $rows['DOCUMENTO'];
      $NOMBRES = $rows['NOMBRES'];
      $FECHA_GEN_TURNO = $rows['FECHA_GEN_TURNO'];
      $FECHA_LLA_AGENTE = $rows['FECHA_LLA_AGENTE'];
      $FECHA_FIN_AGENTE = $rows['FECHA_FIN_AGENTE'];
      $TIEMPO_GEN_LLA = $rows['TIEMPO_GEN_LLA'];
      $TIEMPO_LLA_FIN = $rows['TIEMPO_LLA_FIN'];
      $NOM_AGENTE = $rows['NOM_AGENTE'];




       //comienzo a crear las filas con los datos de la BD
       echo "<tr>";
                      echo "<td>";echo "$ID_REGISTRO"; "</td>";
                      echo "<td>";echo "$TURNO"; "</td>";
                      echo "<td>";echo "$DOCUMENTO"; "</td>";
                      echo "<td>";echo "$NOMBRES"; "</td>";
                      echo "<td>";echo "$FECHA_GEN_TURNO"; "</td>";
                      echo "<td>";echo "$FECHA_LLA_AGENTE"; "</td>";
                      echo "<td>";echo "$FECHA_FIN_AGENTE"; "</td>";
                      echo "<td>";echo "$TIEMPO_GEN_LLA"; "</td>";
                      echo "<td>";echo "$TIEMPO_LLA_FIN"; "</td>";
                      echo "<td>";echo "$NOM_AGENTE"; "</td>";


       echo "</tr>";

}

//Al final imprimimos los registros que fueron generados
// echo "Cantidad de Registros: ".$cont;

sqlsrv_free_stmt( $stmt);

?>
</table>
