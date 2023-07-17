<?php
require_once('../../config/dbcon.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Matriz de recobro de capita"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");

$periodo = $_GET['periodo'];

$regimen = $_GET['regimen'];
if ($regimen == 'S'){
$consulta = oci_parse ($c,"SELECT PER_CAPITACION, NIT_PRESTADOR, NOM_PRESTADOR, D.NOM_DEPARTAMENTO, M.NOM_CIUDAD, TIP_REGIMEN, NUM_CONTRATO, COD_CENTROCOSTOS, '' DATOMOD 
                            FROM  oasis.CAPITACIONMES  LEFT JOIN oasis.DEPARTAMENTO D ON SUBSTR(NUM_CAUSACION,1,2) = D.COD_DEPARTAMENTO 
                            LEFT JOIN oasis.CIUDAD M ON NUM_CAUSACION = M.COD_DEPARTAMENTO || M.COD_CIUDAD
                            INNER JOIN  oasis.ocnt_contrato CO ON CO.CNTN_NUMERO = NUM_CONTRATO AND 
                                                                      CO.CNTC_DOCUMENTO = 'KS' AND CO.CNTC_ESTADO  ='P' 
                            WHERE PER_CAPITACION    = :v_periodo
                            AND TIP_SERVICIO ='CA'            
                            GROUP BY PER_CAPITACION, NIT_PRESTADOR, NOM_PRESTADOR, D.NOM_DEPARTAMENTO, M.NOM_CIUDAD, TIP_REGIMEN, NUM_CONTRATO, COD_CENTROCOSTOS");
}else{
    $consulta = oci_parse ($c,"SELECT PER_CAPITACION, NIT_PRESTADOR, NOM_PRESTADOR, D.NOM_DEPARTAMENTO, M.NOM_CIUDAD, 'C' AS TIP_REGIMEN, NUM_CONTRATO, COD_CENTROCOSTOS, '' DATOMOD 
                            FROM  oasis.CAPITACIONMES  LEFT JOIN oasis.DEPARTAMENTO D ON SUBSTR(NUM_CAUSACION,1,2) = D.COD_DEPARTAMENTO 
                            LEFT JOIN oasis.CIUDAD M ON NUM_CAUSACION = M.COD_DEPARTAMENTO || M.COD_CIUDAD
                            INNER JOIN  oasis.ocnt_contrato CO ON CO.CNTN_NUMERO = NUM_CONTRATO AND 
                                                                      CO.CNTC_DOCUMENTO = 'KC' AND CO.CNTC_ESTADO  ='P' 
                            WHERE PER_CAPITACION    = :v_periodo
                            AND TIP_SERVICIO ='CA'            
                            GROUP BY PER_CAPITACION, NIT_PRESTADOR, NOM_PRESTADOR, D.NOM_DEPARTAMENTO, M.NOM_CIUDAD, TIP_REGIMEN, NUM_CONTRATO, COD_CENTROCOSTOS");
}


oci_bind_by_name($consulta,':v_periodo',$periodo);


?>



<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
    <tr>
        <th align='center'>PERIODO DE CAPITA</th>
        <th align='center'>NIT</th>
        <th align='center'>RAZON SOCIAL</th>
        <th align='center'>DEPARTAMENTO</th>  
        <th align='center'>CIUDAD</th>        
        <th align='center'>REGIMEN</th>        
        <th align='center'>CONTRATO</th>        
        <th align='center'>CENTRO DE COSTOS</th>
        <th align='center'>CAMPO A DIGITAR</th>        


    </tr>

<?php

oci_execute($consulta);

// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta)) {
    echo "<tr>";
            echo "<td align='center'>"; echo$rows['PER_CAPITACION']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NIT_PRESTADOR']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NOM_PRESTADOR']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NOM_DEPARTAMENTO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NOM_CIUDAD']; echo "</td>";
            echo "<td align='center'>"; echo$rows['TIP_REGIMEN']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NUM_CONTRATO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['COD_CENTROCOSTOS']; echo "</td>";
            echo "<td align='center'>"; echo$rows['DATOMOD']; echo "</td>";



    echo "</tr>";
}

print_r(error_get_last());

oci_close($c);

?>




