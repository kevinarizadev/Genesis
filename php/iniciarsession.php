<?php
	$postdata = file_get_contents("php://input");
    if ($postdata != null) {
    	$request = json_decode($postdata);
    	session_start();
    	$nombre = $request->nomb;
	    $cedula = $request->cedu;
	    $rol = $request->rolusu;
      $rolcod = $request->rolcod;
			$codmunicipio = $request->codmun;
			$nommunicipio = $request->nommun;
			$cargo = $request->cargo;
			$coddepa = $request->coddepa;
			$nomdepa = $request->nomdepa;
      $acc = $request->acc;
      $usu = $request->usu;
	    $_SESSION['nombre'] = $nombre;
	    $_SESSION['cedula'] = $cedula;
	    $_SESSION['rol'] = $rol;
      $_SESSION['rolcod'] = $rolcod;
			$_SESSION['codmunicipio'] = $codmunicipio;
			$_SESSION['nommunicipio'] = $nommunicipio;
			$_SESSION['cargo'] = $cargo;
			$_SESSION['coddepa'] = $coddepa;
			$_SESSION['nomdepa'] = $nomdepa;
      $_SESSION['acc'] = $acc;
      $_SESSION['usu'] = $usu;
    }else{
    	header("Location: ../app.php");
    }
?>