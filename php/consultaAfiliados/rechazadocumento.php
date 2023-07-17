<?php
	require_once('../config/dbcon.php');
	require_once('../config/ftpcon.php');
	$ruta = $_GET['ruta'];
	$consulta = oci_parse($c,"begin pq_genesis_ca.p_rechaza_doc(:p_actual_ruta,
																:p_res); end;");
	oci_bind_by_name($consulta,':p_actual_ruta',$ruta);
	$clob = oci_new_descriptor($c,OCI_D_LOB);
	oci_bind_by_name($consulta,':p_res', $clob,-1,OCI_B_CLOB);
	oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		$noj = json_decode($json);
		
		$oldname = $noj->{'oldname'};
		$newname = $noj->{'newname'};
		$carpeta = $noj->{'carpeta'};
		// echo $newname;
		// echo $oldname;
		$path_of_storage = "ASEGURAMIENTO/". $carpeta;
		ftp_chdir($con_id, $path_of_storage);
		$old_name = $oldname;
		$new_name = $newname;
		if (ftp_rename($con_id, $old_name, $new_name)) {
			 echo "1";
			} else {
			 echo "0";
		}
		ftp_close($con_id);
	}else{
		echo 0;
	}
	
?>