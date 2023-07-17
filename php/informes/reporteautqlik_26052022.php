<?php
require_once('../config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=REPORTE AUTORIZACIONES QLIK"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");

$fecha_inicio = $_GET['fecha_inicio'];
$fecha_fin = $_GET['fecha_final'];
$nit = $_GET['nit'];
?>
<h1>REPORTE AUTORIZACIONES QLIK</h1>
<table cellspacing="0" cellpadding="0"  border="1" align="center">
          <tr>
                        <th>NUM_AUTORIZACION</th>
                        <th>UBICACION_AUT</th>
                        <th>SECCIONAL</th>
                        <th>FECHA_CREACION</th>
                        <th>FECHA_PROCESADO</th>
                        <th>HORA_CONFIMADO</th>
                        <th>FECHA_ORDEN</th>
                        <th>NIT_PSS</th>
                        <th>RAZON_SOCIAL</th>
                        <th>NIT_SOLICITANTE</th>
                        <th>UBICACION_TER</th>
                        <th>RAZON_SOLIAL_IPS_SOLICITANTE</th>
                        <th>TIPO_DOCUMENTO</th>
                        <th>DOCUMENTO</th>
                        <th>NOMBRE_AFILIADO</th>
                        <th>FECHA_NACIMIENTO</th>
                        <th>EDAD</th>
                        <th>SEXO</th>
                        <th>CODIGO_MUNICIPIO</th>
                        <th>CODIGO_DPTO_AFILIADO</th>
                        <th>NOMBRE_DPTO_AFILIADO</th>
                        <th>MUNICIPIO_AFILIADO</th>
                        <th>COD_CLASIFICACION</th>
                        <th>NOMBRE_CLASIFICACION</th>
                        <th>UNIDAD_FUNCIONAL</th>
                        <th>COD_DX</th>
                        <th>NOMBRE_DX</th>
                        <th>COD_DX2</th>
                        <th>ALTO_COSTO</th>
                        <th>CLASE</th>
                        <th>TIPO</th>
                        <th>COD_PRODUCTO</th>
                        <th>NOMBRE_PRODUCTO</th>
                        <th>CANTIDAD</th>
                        <th>VALOR_UNITARIO</th>
                        <th>VALOR_SERVICIO</th>
                        <th>COPAGO</th>
                        <th>NIT_RECOBRAR</th>
                        <th>NOMBRE_A_RECOBRAR</th>
                        <th>DOC_RESPONSABLE_AUT</th>
                        <th>NOMBRE_RESPONSABLE</th>
                        <th>ESTADO</th>
                        <th>AUTN_AUTORIZACION_MANUAL</th>
                        <th>FECHA_SOLICITUD</th>
                        <th>NIVEL_COMPLEJIDAD</th>
                        <th>NIVEL_AUTORIZACION</th>
                        <th>ANTICIPO</th>
                        <th>AUTC_IMPRESO</th>
                        <th>ALIADA</th>
                        <th>UBICACION_SOLICITUD</th>
                        <th>UBI_CONTRATO</th>
                        <th>AUTN_SINIESTRO</th>
                        <th>AUTC_REGIMEN</th>
                        <th>PROC_COPAGO</th>
                        <th>AUTN_NIVEL_CONTRIBUTIVO</th>
                        <th>AUTN_NIVEL_SISBEN</th>
                        <th>AMBITO</th>
                        <th>PATOLOGIA</th>
                        <th>TIPO_DE_CONTRATO</th>
                        <th>AUTORIZACION_WEB</th>
                        <th>FECHA_EJECUCION</th>
                        <th>CONTRATO_PRESTACION</th>
                        <th>UBICACION_CONTRATO</th>
                        <th>FECHA_CONFIMADO</th>
                        <th>NUMERO_SOLICITUD</th>
                        <th>EPS_ANTERIOR</th>
                        <th>EPS_ANTERIOR_NOMBRE</th>
                        <th>FUENTE</th>
                        <th>USUARIO_PORTABILIDAD</th>
                        <th>FECHA_SALIDA</th>
                        <th>CODIGO_MUNICIPIO_REC</th>
                        <th>MUNICIPIO_RECEPCION</th>
                        <th>SOLPROGRAMADA</th>
                        <th>SOLESOA</th>
                        <th>STATUS</th>
                        <th>DOC_REALIZA_AUT</th>
                        <th>NOMBRE_REALIZA_AUT</th>
                        <th>DOC_ERRADO_EDAD</th>
                        <th>SOLAUTOMATICA_NOPBS</th>
                        <th>SOLUNICAHOSPITALARIA</th>
                        <th>EXISTE_DETALLE_CONTRATO</th>
                        <th>PRESUP_MAXIMOS</th>
                        <th>MIPRES</th>
                        <th>TIPO_AMBITO</th>
                        <th>PROTECCION_LABORAL</th>
                        <th>OFICINA_AUTORIZA</th>
                        <th>GRUPO_POBLACIONAL</th>
                        <th>DIAS_HABILES_ORDEN_VS_SOLICITUD</th>
                        <th>DIAS_HABILES_SOLICITUD_VS_AUTORIZACION</th>
                        <th>AUTC_TIENE_PGP</th>
                        <th>MARCA_SUPER_EPS_LIQUIDADA</th>
          </tr>



<?php
 $consulta = oci_parse($c, 'begin oasis.pq_genesis_repo.p_archivo_autorizaciones_qlik(:v_ptercero,:v_pfinicial,:v_pffinal,:v_pjson_out,:v_presultado); end;');
 oci_bind_by_name($consulta, ':v_ptercero', $nit);
oci_bind_by_name($consulta, ':v_pfinicial', $fecha_inicio);
oci_bind_by_name($consulta, ':v_pffinal', $fecha_fin);
oci_bind_by_name($consulta, ':v_pjson_out', $json, 4000);
$curs = oci_new_cursor($c);
oci_bind_by_name($consulta, ":v_presultado", $curs, -1, OCI_B_CURSOR);
oci_execute($consulta);
oci_execute($curs);


  while (($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) != false)
{
    
          echo "<tr>";
                        echo "<td>"; echo$row['NUM_AUTORIZACION']; echo "</td>";
                        echo "<td>"; echo$row['UBICACION_AUT']; echo "</td>";
                          echo "<td>"; echo$row['SECCIONAL']; echo "</td>";
                        echo "<td>"; echo$row['FECHA_CREACION']; echo "</td>";
                        echo "<td>"; echo$row['FECHA_PROCESADO']; echo "</td>";
                        echo "<td>"; echo$row['HORA_CONFIMADO']; echo "</td>";
                        echo "<td>"; echo$row['FECHA_ORDEN']; echo "</td>";
                        echo "<td>"; echo$row['NIT_PSS']; echo "</td>";
                        echo "<td>"; echo$row['RAZON_SOCIAL']; echo "</td>";
                        echo "<td>"; echo$row['NIT_SOLICITANTE']; echo "</td>";
                        echo "<td>"; echo$row['UBICACION_TER']; echo "</td>";
                        echo "<td>"; echo$row['RAZON_SOLIAL_IPS_SOLICITANTE']; echo "</td>";
                        echo "<td>"; echo$row['TIPO_DOCUMENTO']; echo "</td>";
                        echo "<td>"; echo$row['DOCUMENTO']; echo "</td>";
                        echo "<td>"; echo$row['NOMBRE_AFILIADO']; echo "</td>";
                        echo "<td>"; echo$row['FECHA_NACIMIENTO']; echo "</td>";
                        echo "<td>"; echo$row['EDAD']; echo "</td>";
                        echo "<td>"; echo$row['SEXO']; echo "</td>";
                        echo "<td>"; echo$row['CODIGO_MUNICIPIO']; echo "</td>";
                        echo "<td>"; echo$row['CODIGO_DPTO_AFILIADO']; echo "</td>";
                        echo "<td>"; echo$row['NOMBRE_DPTO_AFILIADO']; echo "</td>";
                        echo "<td>"; echo$row['MUNICIPIO_AFILIADO']; echo "</td>";
                        echo "<td>"; echo$row['COD_CLASIFICACION']; echo "</td>";
                        echo "<td>"; echo$row['NOMBRE_CLASIFICACION']; echo "</td>";
                        echo "<td>"; echo$row['UNIDAD_FUNCIONAL']; echo "</td>";
                        echo "<td>"; echo$row['COD_DX']; echo "</td>";
                        echo "<td>"; echo$row['NOMBRE_DX']; echo "</td>";
                        echo "<td>"; echo$row['COD_DX2']; echo "</td>";
                        echo "<td>"; echo$row['ALTO_COSTO']; echo "</td>";
                        echo "<td>"; echo$row['CLASE']; echo "</td>";
                        echo "<td>"; echo$row['TIPO']; echo "</td>";
                        echo "<td>"; echo$row['COD_PRODUCTO']; echo "</td>";
                        echo "<td>"; echo$row['NOMBRE_PRODUCTO']; echo "</td>";
                        echo "<td>"; echo$row['CANTIDAD']; echo "</td>";
                        echo "<td>"; echo$row['VALOR_UNITARIO']; echo "</td>";
                        echo "<td>"; echo$row['VALOR_SERVICIO']; echo "</td>";
                        echo "<td>"; echo$row['COPAGO']; echo "</td>";
                        echo "<td>"; echo$row['NIT_RECOBRAR']; echo "</td>";
                        echo "<td>"; echo$row['NOMBRE_A_RECOBRAR']; echo "</td>";
                        echo "<td>"; echo$row['DOC_RESPONSABLE_AUT']; echo "</td>";
                        echo "<td>"; echo$row['NOMBRE_RESPONSABLE']; echo "</td>";
                        echo "<td>"; echo$row['ESTADO']; echo "</td>";
                        echo "<td>"; echo$row['AUTN_AUTORIZACION_MANUAL']; echo "</td>";
                        echo "<td>"; echo$row['FECHA_SOLICITUD']; echo "</td>";
                        echo "<td>"; echo$row['NIVEL_COMPLEJIDAD']; echo "</td>";
                        echo "<td>"; echo$row['NIVEL_AUTORIZACION']; echo "</td>";
                        echo "<td>"; echo$row['ANTICIPO']; echo "</td>";
                        echo "<td>"; echo$row['AUTC_IMPRESO']; echo "</td>";
                        echo "<td>"; echo$row['ALIADA']; echo "</td>";
                        echo "<td>"; echo$row['UBICACION_SOLICITUD']; echo "</td>";
                        echo "<td>"; echo$row['UBI_CONTRATO']; echo "</td>";
                        echo "<td>"; echo$row['AUTN_SINIESTRO']; echo "</td>";
                        echo "<td>"; echo$row['AUTC_REGIMEN']; echo "</td>";
                        echo "<td>"; echo$row['PROC_COPAGO']; echo "</td>";
                        echo "<td>"; echo$row['AUTN_NIVEL_CONTRIBUTIVO']; echo "</td>";
                        echo "<td>"; echo$row['AUTN_NIVEL_SISBEN']; echo "</td>";
                        echo "<td>"; echo$row['AMBITO']; echo "</td>";
                        echo "<td>"; echo$row['PATOLOGIA']; echo "</td>";
                        echo "<td>"; echo$row['TIPO_DE_CONTRATO']; echo "</td>";
                        echo "<td>"; echo$row['AUTORIZACION_WEB']; echo "</td>";
                        echo "<td>"; echo$row['FECHA_EJECUCION']; echo "</td>";
                        echo "<td>"; echo$row['CONTRATO_PRESTACION']; echo "</td>";
                        echo "<td>"; echo$row['UBICACION_CONTRATO']; echo "</td>";
                        echo "<td>"; echo$row['FECHA_CONFIMADO']; echo "</td>";
                        echo "<td>"; echo$row['NUMERO_SOLICITUD']; echo "</td>";
                        echo "<td>"; echo$row['EPS_ANTERIOR']; echo "</td>";
                        echo "<td>"; echo$row['EPS_ANTERIOR_NOMBRE']; echo "</td>";
                        echo "<td>"; echo$row['FUENTE']; echo "</td>";
                        echo "<td>"; echo$row['USUARIO_PORTABILIDAD']; echo "</td>";
                        echo "<td>"; echo$row['FECHA_SALIDA']; echo "</td>";
                        echo "<td>"; echo$row['CODIGO_MUNICIPIO_REC']; echo "</td>";
                        echo "<td>"; echo$row['MUNICIPIO_RECEPCION']; echo "</td>";
                        echo "<td>"; echo$row['SOLPROGRAMADA']; echo "</td>";
                        echo "<td>"; echo$row['SOLESOA']; echo "</td>";
                        echo "<td>"; echo$row['STATUS']; echo "</td>";
                        echo "<td>"; echo$row['DOC_REALIZA_AUT']; echo "</td>";
                        echo "<td>"; echo$row['NOMBRE_REALIZA_AUT']; echo "</td>";
                        echo "<td>"; echo$row['DOC_ERRADO_EDAD']; echo "</td>";
                        echo "<td>"; echo$row['SOLAUTOMATICA_NOPBS']; echo "</td>";
                        echo "<td>"; echo$row['SOLUNICAHOSPITALARIA']; echo "</td>";
                        echo "<td>"; echo$row['EXISTE_DETALLE_CONTRATO']; echo "</td>";
                        echo "<td>"; echo$row['PRESUP_MAXIMOS']; echo "</td>";
                        echo "<td>"; echo$row['MIPRES']; echo "</td>";
                        echo "<td>"; echo$row['TIPO_AMBITO']; echo "</td>";
                        echo "<td>"; echo$row['PROTECCION_LABORAL']; echo "</td>";
                        echo "<td>"; echo$row['OFICINA_AUTORIZA']; echo "</td>";
                        echo "<td>"; echo$row['GRUPO_POBLACIONAL']; echo "</td>";
                        echo "<td>"; echo$row['DIAS_HABILES_ORDEN_VS_SOLICITUD']; echo "</td>";
                        echo "<td>"; echo$row['DIAS_HABILES_SOLICITUD_VS_AUTORIZACION']; echo "</td>";
                        echo "<td>"; echo$row['AUTC_TIENE_PGP']; echo "</td>";
                        echo "<td>"; echo$row['MARCA_SUPER_EPS_LIQUIDADA']; echo "</td>";
        echo "</tr>";
 }
oci_close($c);

?>
