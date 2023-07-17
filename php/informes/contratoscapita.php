<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte Contratos de Capita"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");


//header("Content-Type: text/plain");

//header('Content-Disposition: attachment; filename="REPORTE_INCAPACIDADES.txt"'); 
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"SELECT DISTINCT
                            CASE
                              WHEN UPPER(BC.UBGN_CODIGO) = '1' THEN 'NACIONAL'
                              ELSE F_UTF8_JSON(TRIM(UPPER(BC.UBGN_CODIGO)))
                            END COD_DEPARTAMENTO,
                            CASE
                              WHEN UPPER(BC.UBGC_NOMBRE) = 'CALL CENTER' THEN 'NACIONAL'
                              ELSE F_UTF8_JSON(TRIM(UPPER(BC.UBGC_NOMBRE)))
                            END DEPARTAMENTO,
                            C.CNTN_UBICACION CODIGO_MUNICIPIO,
                            UC.UBGC_NOMBRE MUNICIPIO,
                            TRUNC(T.TERV_CODIGO) NIT,
                            F_UTF8_JSON(TRIM(UPPER(T.TERC_NOMBRE))) NOMBRE_PRESTADOR,
                            CASE WHEN C.CNTC_DOCUMENTO = 'KS' THEN 'SUBSIDIADO'
                              ELSE 'CONTRIBUTIVO'
                            END REGIMEN,
                            C.CNTN_NUMERO NUMERO_CONTRATO,
                            CO.CONC_NOMBRE CONCEPTO,
                            MO.MOTC_NOMBRE MOTIVO,
                            BA.ASUC_NOMBRE ASUNTO,
                            TO_CHAR(C.CNTF_INICIAL,'DD/MM/YYYY') FECHA_INICIAL,
                            TO_CHAR(C.CNTF_FINAL,'DD/MM/YYYY') FECHA_FINAL
                            FROM OCNT_CONTRATO C
                            INNER JOIN BTER_TERCERO T ON T.TERV_CODIGO = C.CNTV_TERCERO
                            INNER JOIN BUBG_UBICACION_GEOGRAFICA UC ON (C.CNTN_UBICACION = UC.UBGN_CODIGO)
                            INNER JOIN BUBG_UBICACION_GEOGRAFICA BC ON (CASE WHEN LENGTH(UC.UBGN_CODIGO)= 4 THEN SUBSTR(UC.UBGN_CODIGO,1,1)||'000' ELSE SUBSTR(UC.UBGN_CODIGO,1,2)||'000' END = BC.UBGN_CODIGO)
                            INNER JOIN OASIS.BCON_CONCEPTO CO ON (CO.CONC_DOCUMENTO = C.CNTC_DOCUMENTO AND
                                                                  CO.CONC_CODIGO = C.CNTC_CONCEPTO)
                            LEFT JOIN OASIS.BMOT_MOTIVO MO ON (MO.MOTC_DOCUMENTO = C.CNTC_DOCUMENTO AND
                                                               MO.MOTC_CONCEPTO = C.CNTC_CONCEPTO AND
                                                               MO.MOTN_CODIGO = C.CNTN_MOTIVO)
                            LEFT JOIN OASIS.BASU_ASUNTO BA ON (BA.ASUC_DOCUMENTO = C.CNTC_DOCUMENTO AND
                                                               BA.ASUC_CONCEPTO = C.CNTC_CONCEPTO AND
                                                               BA.ASUN_MOTIVO = C.CNTN_MOTIVO AND
                                                               BA.ASUN_CODIGO = C.CNTN_ASUNTO)
                            WHERE C.CNTC_DOCUMENTO IN ('KS','KC')
                            AND C.CNTC_CONCEPTO IN ('MC','CA', 'CP')
                            AND C.CNTC_ESTADO = 'P'
                            ");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

?>

<h1>Reporte Contratos de Capita </h1>
<h3>Periodo:  </h3>


<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->

      <tr>

            <th>COD_DEPARTAMENTO</th>
            <th>DEPARTAMENTO</th>
            <th>CODIGO_MUNICIPIO</th>
            <th>MUNICIPIO</th>
            <th>NIT</th>
            <th>NOMBRE_PRESTADOR</th>
            <th>REGIMEN</th>
            <th>NUMERO_CONTRATO</th>
            <th>CONCEPTO</th>
            <th>MOTIVO</th>
            <th>ASUNTO</th>
            <th>FECHA_INICIAL</th>
            <th>FECHA_FINAL</th>


      </tr>

<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
 while( $rows = oci_fetch_assoc($consulta))
 {
	        echo "<tr>";
                      echo "<td>"; echo$rows['COD_DEPARTAMENTO']; echo "</td>";

                      echo "<td>"; echo$rows['DEPARTAMENTO']; echo "</td>";
                      echo "<td>"; echo$rows['CODIGO_MUNICIPIO']; echo "</td>";
                      echo "<td>"; echo$rows['MUNICIPIO']; echo "</td>";
                      echo "<td>"; echo$rows['NIT']; echo "</td>";
                      echo "<td>"; echo$rows['NOMBRE_PRESTADOR']; echo "</td>";
                      echo "<td>"; echo$rows['REGIMEN']; echo "</td>";
                      echo "<td>"; echo$rows['NUMERO_CONTRATO']; echo "</td>";
                      echo "<td>"; echo$rows['CONCEPTO']; echo "</td>";
                      echo "<td>"; echo$rows['MOTIVO']; echo "</td>";
                      echo "<td>"; echo$rows['ASUNTO']; echo "</td>";
                      echo "<td>"; echo$rows['FECHA_INICIAL']; echo "</td>";
                      echo "<td>"; echo$rows['FECHA_FINAL']; echo "</td>";
        echo "</tr>";
 }
//  // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
