<?php
require_once('../config/dbconsqlserver_softars.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte General - " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");


$cod_area = $_GET['cod_area'];
$cod_ubicacion = $_GET['cod_ubicacion'];
$periodo_ini = $_GET['periodo_ini'];
$periodo_fin = $_GET['periodo_fin'];
$nombre = $_GET['nombre'];
$periodo = $_GET['periodo'];
$imagen = $_GET['imagen'];

// echo $imagen;

?>

<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th>DEPARTAMENTO</th>
        <th>MUNICIPIO</th>
        <th>PERIODO DE REPORTE</th>
        <th>NOMBRE DEL DOCUMENTO</th>
        <th>FECHA DE ENTREGA</th>
        <th>SOPORTE DE IMAGEN</th>
        <th>ESTADO</th>
        <th>OBLIGATORIO</th>
        <th>VIGENCA</th>
        <th>SEMANA</th>
        <th>PRESTADOR</th>
        <th>CONTRATO</th>
        <th>USUARIO QUE REALIZO EL ULTIMO CAMBIO</th>
    </tr>
    <?php

    $consulta = "select

D.NOM_DEPARTAMENTO DPTO,
G.NOM_CIUDAD MUNICIPIO,
H.PER_REPORTE PERIODO_REPORTE,
F.DES_DOCENTREGA NOMBRE_DOCUMENTO,
convert(varchar, H.FEC_DOCENTREGA, 103) FECHA_ENTREGA,
CASE WHEN H.ING_DOCENTREGA = '' THEN 'SIN SOPORTE' ELSE  'CON SOPORTE' END ESTADO_IMAGEN,
CASE WHEN H.ESTADO = 'R' THEN 'REVISION'
WHEN H.ESTADO = 'A' THEN 'APROBADO'
WHEN H.ESTADO = 'C' THEN 'RECHAZADO'
WHEN H.ING_DOCENTREGA = '' THEN 'EN ESPERA'
ELSE
'APROBADO' END  ESTADO,
CASE 
WHEN ISNULL(F.OBL_SOPORTE,'NO')='N'
THEN 'NO'
WHEN F.OBL_SOPORTE='S'
THEN 'SI'
END
OBLIGATORIO,
CASE WHEN F.PER_ENTREGA = 'M' THEN 'MENSUAL' ELSE  'SEMANAL' END  PERIODICIDAD,
CASE WHEN F.PER_ENTREGA = 'M' THEN 'NO DISPONIBLE' ELSE  H.CONF_ORIGINAL END  SEMANA,
ISNULL((SELECT TOP(1) NOM_PRESTADOR PRESTADOR FROM CAPITACIONMES
WHERE NIT_PRESTADOR=H.CONF_ORIGINAL
COLLATE SQL_Latin1_General_CP850_CI_AS
),'NO APLICA') PRESTADOR,
CASE  WHEN CHARINDEX('_',H.CODCTROPRESTADOR) > 0 THEN SUBSTRING(H.CODCTROPRESTADOR,CHARINDEX('_',H.CODCTROPRESTADOR)+1,LEN(H.CODCTROPRESTADOR)-CHARINDEX('_',H.CODCTROPRESTADOR))
ELSE H.CODCTROPRESTADOR END CONTRATO,
ISNULL(H.COD_USUARIO_RUTA,'NO DISPONIBLE') USUARIO

from CONTDOCENTREGAENTES H
inner join TIP_DOCENTREGA F ON F.COD_DOCENTREGA = H.COD_DOCENTREGA  AND F.ID_AREA = ?
COLLATE SQL_Latin1_General_CP850_CI_AS
inner join CIUDADES g ON CONCAT(G.COD_DEPARTAMENTO,COD_CIUDAD) = H.CODCTROCOSTOS COLLATE SQL_Latin1_General_CP850_CI_AS
inner join DEPARTAMENTOS D ON D.COD_DEPARTAMENTO = G.COD_DEPARTAMENTO
where H.CODCTROCOSTOS like CONCAT(?,'%') and
CONVERT(DATETIME,CONCAT(SUBSTRING(H.PER_REPORTE, 1, 2),'/01/',SUBSTRING(H.PER_REPORTE, 4, 7))) >= ?
AND
CONVERT(DATETIME,CONCAT(SUBSTRING(H.PER_REPORTE, 1, 2),'/01/',SUBSTRING(H.PER_REPORTE, 4, 7))) <= ? AND
F.DES_DOCENTREGA like CONCAT('%',?,'%') and
H.PER_REPORTE like CONCAT('%',?,'%')
GROUP BY
D.NOM_DEPARTAMENTO, 
G.NOM_CIUDAD,
H.PER_REPORTE,
F.DES_DOCENTREGA,
H.FEC_DOCENTREGA,     
H.ING_DOCENTREGA,
H.CONF_ORIGINAL,
--T.NOM_PRESTADOR,
H.CODCTROPRESTADOR,
F.PER_ENTREGA,
F.OBL_SOPORTE,
H.COD_USUARIO_RUTA,
H.ESTADO
              ORDER BY H.FEC_DOCENTREGA DESC";
    $stmt = sqlsrv_query($conn, $consulta, array($cod_area, $cod_ubicacion, $periodo_ini, $periodo_fin, $nombre, $periodo));
    $row = array();
    $rows = array();
    if ($stmt === false) {
        die(print_r(sqlsrv_errors(), true));
    }
    // Se recorre el array con los resultados obtenidos de la base de datos

    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
        // echo $row;

        if ($imagen == 1) {
            echo "<tr>";
            echo "<td>";
            echo $row['DPTO'];
            echo "</td>";
            echo "<td>";
            echo $row['MUNICIPIO'];
            echo "</td>";
            echo "<td>";
            echo $row['PERIODO_REPORTE'];
            echo "</td>";
            echo "<td>";
            echo $row['NOMBRE_DOCUMENTO'];
            echo "</td>";
            echo "<td>";
            echo $row['FECHA_ENTREGA'];
            echo "</td>";
            echo "<td>";
            echo $row['ESTADO_IMAGEN'];
            echo "</td>";
            echo "<td>";
            echo $row['ESTADO'];
            echo "</td>";
            echo "<td>";
            echo $row['OBLIGATORIO'];
            echo "</td>";
            echo "<td>";
            echo $row['PERIODICIDAD'];
            echo "</td>";
            echo "<td>";
            echo $row['SEMANA'];
            echo "</td>";
            echo "<td>";
            echo $row['PRESTADOR'];
            echo "</td>";
            echo "<td>";
            echo $row['CONTRATO'];
            echo "</td>";
            echo "<td>";
            echo $row['USUARIO'];
            echo "</td>";
            echo "</tr>";
        }

        if ($imagen != 1 && $row['ESTADO_IMAGEN'] == $imagen) {
            echo "<tr>";
            echo "<td>";
            echo $row['DPTO'];
            echo "</td>";
            echo "<td>";
            echo $row['MUNICIPIO'];
            echo "</td>";
            echo "<td>";
            echo $row['PERIODO_REPORTE'];
            echo "</td>";
            echo "<td>";
            echo $row['NOMBRE_DOCUMENTO'];
            echo "</td>";
            echo "<td>";
            echo $row['FECHA_ENTREGA'];
            echo "</td>";
            echo "<td>";
            echo $row['ESTADO_IMAGEN'];
            echo "</td>";
            echo "<td>";
            echo $row['ESTADO'];
            echo "</td>";
            echo "<td>";
            echo $row['OBLIGATORIO'];
            echo "</td>";
            echo "<td>";
            echo $row['PERIODICIDAD'];
            echo "</td>";
            echo "<td>";
            echo $row['SEMANA'];
            echo "</td>";
            echo "<td>";
            echo $row['PRESTADOR'];
            echo "</td>";
            echo "<td>";
            echo $row['CONTRATO'];
            echo "</td>";
            echo "<td>";
            echo $row['USUARIO'];
            echo "</td>";
            echo "</tr>";
        }
    }
    //  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    // Se cierra la conexion a la base de datos para evitar bloqueos
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);
    ?>