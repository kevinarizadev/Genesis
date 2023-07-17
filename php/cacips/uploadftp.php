<?php
session_start();
include("..\config\dbcon_etl.php");
header ('Content-type: text/html; charset=ascii');


//recibimos las variables por metodo post
$codigojob = "Cargue Resol 2463";


$var_control="0";




//Fin Bloque Validaciones Campos


		#echo "Nombre Archivo: ".$NombreArchivo."</br></br>";

	// En caso de no existir error de validacion, procedemos a ejecutar el registro de la info
	if ($var_control=="0")
	{


$myparams['codigojob'] = $codigojob;
$myparams['strCodig'] = '';
$myparams['strTituloError'] ='';
$myparams['strMessageError'] ='';
$myparams['intValorError'] = '';


$procedure_params = array(array(&$myparams['codigojob'],SQLSRV_PARAM_IN),
array(&$myparams['strTituloError'], SQLSRV_PARAM_OUT),
array(&$myparams['strMessageError'], SQLSRV_PARAM_OUT),
array(&$myparams['strCodig'],SQLSRV_PARAM_OUT),
array(&$myparams['intValorError'],SQLSRV_PARAM_OUT));


$consulta = "EXEC etlsp_EjecutaJob  
@strProceso= ?
,@strTituloError= ?
,@strMessageError= ?
,@strCodig= ?                         
,@intValorError= ?  ";


	$stmt = sqlsrv_prepare($conn, $consulta, $procedure_params);
	if( !$stmt ) {
	die( print_r( sqlsrv_errors(), true));
	}

	if(sqlsrv_execute($stmt)){
		if ( $myparams['intValorError'] === 1 ){
			sqlsrv_free_stmt($stmt);
			?>
				<script> alert ('<?php echo $myparams['strCodig'] ?>') 
				document.location=('./index.php');
				</script>
			<?php
		}else{
			sqlsrv_free_stmt($stmt);
			?>
				<script> alert ("Job Ejecutado.. Favor Esperar Mail Notificacion De Finalizacion") 
				document.location=('./index.php');
				</script>


			<?php
		}
	}else{
		die( print_r( sqlsrv_errors(), true));
	    //Liberar los Recursos
		sqlsrv_free_stmt($stmt);
	}
	sqlsrv_close( $conn);  
}
?>