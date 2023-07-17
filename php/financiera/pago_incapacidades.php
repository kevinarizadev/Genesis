<?php
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
	$function = 'P_REPORTE_PAGOS_PRESTACIONES_ECONOMICAS';
	$function();

	
  function P_REPORTE_PAGOS_PRESTACIONES_ECONOMICAS(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$v_pcantidad_pre  = $request->v_pcantidad_pre;
		$consulta = oci_parse($c,'begin PQ_GENESIS_FINANCIERA.P_REPORTE_PAGOS_PRESTACIONES_ECONOMICAS(  :v_pjson_row_in,
                                                                                                        :v_pcantidad_pre,
                                                                                                        :v_json_row); end;');
		$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta,':v_pcantidad_pre',$v_pcantidad_pre);
		oci_bind_by_name($consulta,':v_pjson_row_in',$json_parametros, -1, OCI_B_CLOB);
		$json_parametros->writeTemporary($request->v_pjson_detalle);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
	
		if (isset($clob)) {
            $json = $clob->read($clob->size());
            $array = json_decode($json);
            $name = "pago_incapacidades_archivo.txt";
            $file = fopen($name, "w");
            fwrite($file, "tipo_doc|documento|fecha_inicio|fecha_fin|valor|fecha_pago|tipo_doc_apo|documento_apo|no_de_autorizacion|cuoc_documento|cuon_numero|cuon_ubicacion|cuov_cuenta|cruc_doc_documento|crun_doc_numero|crun_doc_ubicacion|cruf_fecha|facv_total_pagor" . PHP_EOL);
            foreach ($array as $value) {
            fwrite($file,  $value->tipo_doc.'|'. $value->documento.'|'. $value->fecha_inicio.'|'. $value->fecha_fin.'|'. $value->valor.'|'. $value->fecha_pago.'|'. $value->tipo_doc_apo.'|'. $value->documento_apo.'|'. $value->no_de_autorizacion.'|'. $value->cuoc_documento.'|'. $value->cuon_numero.'|'. $value->cuon_ubicacion.'|'. $value->cuov_cuenta.'|'. $value->cruc_doc_documento.'|'. $value->crun_doc_numero.'|'. $value->crun_doc_ubicacion.'|'. $value->cruf_fecha.'|'. $value->facv_total_pagor . PHP_EOL);
            }
            fclose($file); 
            echo 'php/financiera/'.$name;
		}else{
			echo 0;
		}
		oci_close($c);
  }



?>
