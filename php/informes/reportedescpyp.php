<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Reporte Total Radicacion Prestadores"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");


//header("Content-Type: text/plain");

//header('Content-Disposition: attachment; filename="REPORTE_INCAPACIDADES.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

$annos = $_GET['anno'];
$nit = $_GET['nit'];

//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"SELECT TFC.FCDF_FECHA mes,
       TO_CHAR(TFC.FCDF_FECHA,'YYYY') AÑO,
       TO_CHAR(TFC.FCDF_FECHA,'MM') MES,
       T.TERC_NOMBRE AS RAZON_SOCIAL,
       NVL(T.TERV_CODIGO,0) AS NIT,
       tfc.fcdn_ubicacion cod_mun,
       b.ubgc_nombre municipio,
       TFC.FCDC_ARCHIVO,
       TFC.FCDC_PRODUCTO,
       P.PROC_NOMBRE,
       TFC.FCDC_FINALIDAD,
       TFC.FCDC_TIPO_DOC_AFILIADO,
       TFC.FCDC_AFILIADO,
       A.AFIC_SEXO,
       A.AFIN_UBICACION_GEOGRAFICA municipio_afiliado,
       A.AFIF_NACIMIENTO FECHA_NTO,
      TRUNC(((TFC.FCDF_FECHA-A.AFIF_NACIMIENTO)/365),1)EDAD,
       TFC.FCDC_DIAGNOSTICO,D.DIAC_NOMBRE,
       TFC.FCDC_OBSERVACION,
       TFC.FCDC_CODIGO_ACTIVIDAD,
         PP.ACTC_NOMBRE,
         TFC.FCDC_MARCA, tfc.facn_contrato, c.cntc_concepto
FROM tfcd_factura_detalle TFC INNER JOIN BTER_TERCERO T ON T.TERV_CODIGO = TFC.FCDV_PROVEEDOR
                                  left JOIN EAFI_AFILIADO A ON TRIM(A.AFIC_TIPO_DOCUMENTO) = TRIM(TFC.FCDC_TIPO_DOC_AFILIADO)
                                                        AND TRIM(A.AFIC_DOCUMENTO) = TRIM(TFC.FCDC_AFILIADO)
                              LEFT JOIN EPRO_PRODUCTO P ON (P.PROC_CODIGO) = TRIM(TFC.FCDC_PRODUCTO)
                              LEFT JOIN EDIA_DIAGNOSTICO D ON TRIM(D.DIAC_CODIGO) = TRIM(TFC.FCDC_DIAGNOSTICO)
                              LEFT JOIN rips_actividad PP ON pp.codigo =   tfc.fcdc_codigo_actividad

                              INNER JOIN (SELECT DISTINCT ACPN_PROVEEDOR FROM EACP_ACTIVIDAD_PRESTADOR)ON ACPN_PROVEEDOR = TFC.FCDV_PROVEEDOR
                              inner join bubg_ubicacion_geografica b on b.ubgn_codigo = tfc.fcdn_ubicacion
                              left join ocnt_contrato c on c.cntn_numero = tfc.facn_contrato
WHERE TO_CHAR(TFC.FCDF_FECHA,'YYYY') = :anno
AND TFC.FCDV_PROVEEDOR = :nit");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':anno',$annos);
oci_bind_by_name($consulta,':nit',$nit);
?>

<h1>PLAN DE CARGOS </h1>
<h3>Periodo:  <?php echo $annos?> y Prestador <?php echo $nit?> </h3>


<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->

      <tr>

            <th> MES</th>
            <th> AÑO</th>
            <th> MES</th>
            <th> RAZON_SOCIAL</th>
            <th> NIT</th>
            <th> COD_MUN</th>
            <th> MUNICIPIO</th>
            <th> FCDC_ARCHIVO</th>
            <th> FCDC_PRODUCTO</th>
            <th> PROC_NOMBRE</th>
            <th> FCDC_FINALIDAD</th>
            <th> FCDC_TIPO_DOC_AFILIADO</th>
            <th> FCDC_AFILIADO</th>
            <th> AFIC_SEXO</th>
            <th> MUNICIPIO_AFILIADO</th>
            <th> FECHA_NTO</th>
            <th> EDAD</th>
            <th> FCDC_DIAGNOSTICO</th>
            <th> DIAC_NOMBRE</th>
            <th> FCDC_OBSERVACION</th>
            <th> FCDC_CODIGO_ACTIVIDAD</th>
            <th> ACTC_NOMBRE</th>
            <th> FCDC_MARCA</th>
            <th> FACN_CONTRATO</th>
            <th> CNTC_CONCEPTO</th>


      </tr>

<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
 while( $rows = oci_fetch_assoc($consulta))
 {
	        echo "<tr>";

                      echo "<td>"; echo$rows['MES']; echo "</td>";
                      echo "<td>"; echo$rows['AÑO']; echo "</td>";
                      echo "<td>"; echo$rows['MES']; echo "</td>";
                      echo "<td>"; echo$rows['RAZON_SOCIAL']; echo "</td>";
                      echo "<td>"; echo$rows['NIT']; echo "</td>";
                      echo "<td>"; echo$rows['COD_MUN']; echo "</td>";
                      echo "<td>"; echo$rows['MUNICIPIO']; echo "</td>";
                      echo "<td>"; echo$rows['FCDC_ARCHIVO']; echo "</td>";
                      echo "<td>"; echo$rows['FCDC_PRODUCTO']; echo "</td>";
                      echo "<td>"; echo$rows['PROC_NOMBRE']; echo "</td>";
                      echo "<td>"; echo$rows['FCDC_FINALIDAD']; echo "</td>";
                      echo "<td>"; echo$rows['FCDC_TIPO_DOC_AFILIADO']; echo "</td>";
                      echo "<td>"; echo$rows['FCDC_AFILIADO']; echo "</td>";
                      echo "<td>"; echo$rows['AFIC_SEXO']; echo "</td>";
                      echo "<td>"; echo$rows['MUNICIPIO_AFILIADO']; echo "</td>";
                      echo "<td>"; echo$rows['FECHA_NTO']; echo "</td>";
                      echo "<td>"; echo$rows['EDAD']; echo "</td>";
                      echo "<td>"; echo$rows['FCDC_DIAGNOSTICO']; echo "</td>";
                      echo "<td>"; echo$rows['DIAC_NOMBRE']; echo "</td>";
                      echo "<td>"; echo$rows['FCDC_OBSERVACION']; echo "</td>";
                      echo "<td>"; echo$rows['FCDC_CODIGO_ACTIVIDAD']; echo "</td>";
                      echo "<td>"; echo$rows['ACTC_NOMBRE']; echo "</td>";
                      echo "<td>"; echo$rows['FCDC_MARCA']; echo "</td>";
                      echo "<td>"; echo$rows['FACN_CONTRATO']; echo "</td>";
                      echo "<td>"; echo$rows['CNTC_CONCEPTO']; echo "</td>";




        echo "</tr>";
 }
//  // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
