<?php
	$day = date("dmY");
	$var = is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/cargue_ftp/Digitalizacion/Genesis/Movilidad/'. $day);
	if ($var == true) {
		echo "true";
	}
?>