<?php
	require_once('../../config/dbcon_prod.php');
	$type = $_GET['type'];
	$num = $_GET['id'];
	$consulta = oci_parse($c,"select distinct b.terv_codigo codigo,case x.afec_tipo_tercero when 'N' then b.terc_nombre when 'C' then tc.ticc_nombre || ' - ' || e.afic_nombre end nombre
								from eafe_afiliado_empleador x
								left join bter_tercero b on x.afev_tercero = b.terv_codigo
								left join eafi_afiliado e on e.afic_tipo_documento = 'CC' and e.afic_documento = to_char(x.afev_tercero)
								left join etic_tipo_cotizante tc on tc.ticn_codigo = x.afen_tipo_cotizante
							      where x.afec_tipo_doc_afiliado = :v_ptipo_documento and 
							            x.afec_afiliado = :v_pdocumento");	
	oci_bind_by_name($consulta,':v_ptipo_documento',$type);
	oci_bind_by_name($consulta,':v_pdocumento',$num);
	oci_execute($consulta);
	$rows = array();
	while($row = oci_fetch_assoc($consulta))
	{
		$rows[] = $row;
	}
	echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
	oci_close($c);
?>