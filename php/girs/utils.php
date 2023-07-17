<?php

function response($data = null, $status = 200) {
	http_response_code($status);
	header('content-type: application/json');
	echo json_encode($data);
	exit;
}

function query($sql, $bindings, $response = null, $response_key = null, $env = 'DEV') {
	global $config;
	if ($env === 'DEV') {
		$connection = oci_connect($config['DB_USER'],$config['DB_PASSWORD'], $config['DB_HOST'],'AL32UTF8');	
	} else if ($env === 'PROD') {
		$connection = oci_connect($config['DB_USER_PROD'],$config['DB_PASSWORD_PROD'], $config['DB_HOST_PROD'],'AL32UTF8');
	}
	
	$query = oci_parse($connection, $sql);
	foreach($bindings as $binding) {
		if (gettype($binding['value']) === 'array') {
			// $clob = oci_new_descriptor($connection, OCI_D_LOB);
			oci_bind_by_name($query, $binding['key'], $binding['value'],-1,OCI_B_CLOB);
		} else {
			oci_bind_by_name($query, $binding['key'], $binding['value']);	
		}		
	}
	if ($response === 'TABLE') {
		$cursor = oci_new_cursor($connection);
		oci_bind_by_name($query, $response_key, $cursor, -1, OCI_B_CURSOR);
		try {
			$execute = oci_execute($query);

			if ($execute === false) {
				var_dump(oci_error($query));
			}

	    	oci_execute($cursor, OCI_DEFAULT);

	   		$data = null;

		    oci_fetch_all($cursor, $data, 0, -1, OCI_FETCHSTATEMENT_BY_ROW | OCI_ASSOC);

		    oci_free_statement($query);
		    oci_free_statement($cursor);
		    oci_close($connection);
		    return $data;	
		} catch (Exception $exception) {

		}
		
	} else if ($response === 'JSON') {
		$clob = oci_new_descriptor($connection, OCI_D_LOB);
		oci_bind_by_name($query, $response_key, $clob,-1,OCI_B_CLOB);
		oci_execute($query,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			oci_close($connection);
			$decoded = json_decode($json);
			if (json_last_error() === JSON_ERROR_NONE) {
				return $decoded;	
			} else {
				var_dump(json_last_error());
			}


			
		}else{
			oci_close($connection);
			return null;
		}
	}

	return null;
}