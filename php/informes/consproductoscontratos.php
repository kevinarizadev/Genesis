<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();

function consultaproducto(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$contrato          = $request->contrato;
	$regimen          = $request->regimen;
	$producto          = $request->producto;

	$consulta = oci_parse($c,"SELECT c.cndn_numero,c.cndc_producto, c.cndn_clasificacion, p.pron_clasificacion
														from ocnd_contrato_detalle c inner join epro_producto p on trim(p.proc_codigo) = trim(c.cndc_producto)
														where cndn_numero = :contrato
														and cndc_documento = :regimen
														and  trim(cndc_producto) = :producto");

	oci_bind_by_name($consulta,':contrato',$contrato);
	oci_bind_by_name($consulta,':regimen',$regimen);
	oci_bind_by_name($consulta,':producto',$producto);

	oci_execute($consulta);


	$rows = array();
	while($row = oci_fetch_assoc($consulta))
	{
	$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
}


?>
