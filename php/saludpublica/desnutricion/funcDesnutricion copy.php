<?php
	
    $postdata = file_get_contents("php://input");
    error_reporting(0);
    $request = json_decode($postdata);
    $function = $request->function;
    $function();



      function obtenerTipoingreso(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_TIPOINGRESO(:v_json_row); end;');

        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

            echo 0;

        }
        oci_close($c);

    }

    function obtenerAjuste(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_AJUSTEDES(:v_json_row); end;');
        
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

            echo 0;

        }
        oci_close($c);

    }

    function obtenerCasos(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_CASOSDES(:v_json_row); end;');

        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

            echo 0;

        }
        oci_close($c);

    }
 
    function obtenerEntidades(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_ENTIDADDES(:v_json_row); end;');

        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

            echo 0;

        }
        oci_close($c);

    }

	function enviarreporte(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$datos = $request->datos;
		$soporte = $request->adj;
		$len = $request->lenadjunto;
		$type = $request ->type;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_DESNUTRICION.P_UI_DESNUTRICON(:v_pjson_row_in,:v_pjson_row_adj,:v_len, :v_ptipo, :v_pjson_row_out); end;');
		$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
		$json_sop = oci_new_descriptor($c, OCI_D_LOB);		
		oci_bind_by_name($consulta,':v_ptipo',$type);
		oci_bind_by_name($consulta,':v_len',$len);
		oci_bind_by_name($consulta, ':v_pjson_row_adj', $json_sop, -1, OCI_B_CLOB);
		$json_sop->writeTemporary($soporte);		
		oci_bind_by_name($consulta, ':v_pjson_row_in', $json_parametros, -1, OCI_B_CLOB);
		$json_parametros->writeTemporary($datos);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}


function buscaafiliado(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$num = $request->id;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_INFORMACION_BASICA(:v_tipodoc,:v_documento,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_tipodoc',$type);
		oci_bind_by_name($consulta,':v_documento',$num);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}
 

    function archivos(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$num = $request->id;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_SOPORTES(:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }
    
    function obtenercontrol(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$num = $request->id;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_USUARIODES(:v_tipodoc,:v_documento,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_tipodoc',$type);
		oci_bind_by_name($consulta,':v_documento',$num);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }
    

    function obtenerdetalle(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_DETALLEUSUARIO(:v_pcodigo,:v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta,':v_pcodigo',$type);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }


    function obtenerdatosips(){
		require_once('../../config/dbcon_prod.php');
		global $request;	
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_INFORMACION_BASICA_IPS(:v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
      	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function reporte_total(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$type = $request->type;
		$num = $request->id;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_REPORTE(:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }
	

	function obtenerpuntajez(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$sexo = $request->sexo;
		$talla = $request->talla;
		$peso = $request->peso;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_PUNTAJEZ (:v_psexo,:v_talla,:v_peso,:v_json_row ); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_psexo',$sexo);
		oci_bind_by_name($consulta,':v_talla',$talla);
		oci_bind_by_name($consulta,':v_peso',$peso);
      	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }

	function cargarsoporte(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		$codigo_desnutricion = $request ->codigo_desnutricion;
		$codigoSemana = $request ->codigoSemana;
		$respo = $request ->respo;
		$rutas = $request ->rutas;
		$tipo = $request ->tipo;
		$tipo_profesion = $request ->tipo_profesion;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_SOPORTE_DESNUTRICION (:v_codigo_desnutricion,
																						:v_codigo_semana,
																						:v_responsable,
																						:v_ruta,
																						:v_tipo,
																						:v_tipo_profesion,
																						:v_pjson_row_out ); end;');

		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_codigo_desnutricion',$codigo_desnutricion);
		oci_bind_by_name($consulta,':v_codigo_semana',$codigoSemana);
		oci_bind_by_name($consulta,':v_responsable',$respo);
		oci_bind_by_name($consulta,':v_ruta',$rutas);
		oci_bind_by_name($consulta,':v_tipo',$tipo);
		oci_bind_by_name($consulta,':v_tipo_profesion',$tipo_profesion);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }


	function subir_soporte_denustricion(){
		require_once('../../config/dbcon_prod.php');
		require_once('../../config/ftpcon.php');
		include('../../upload_file/subir_archivo.php');
		global $request;
		$data = $request->data;
		$arrlength=count($request->data);
		$hoy = date('dmY');
		$id = uniqid();
		$path = '/cargue_ftp/Digitalizacion/Genesis/desnutricion/'.$hoy.'/';
	
		if ($arrlength == 0) {
			$res = array('codigo' => 1, 'mensaje' => 'No Hay Documentos Cargados Para Su Envio');
			echo json_encode($res);
		} else {
			$estado = 0;
			for ($i=0; $i < $arrlength ; $i++) {				
				$name = $data[$i]->tiposop.'_'.$data[$i]->name.'_'.$hoy.'_'.$id;
				$subio = subirFTP($data[$i]->src,$path,$name,$data[$i]->ext);
				if ($subio != '0 - Error') {
					$rutas[$i]->ruta = $subio;
					$rutas[$i]->tipo = $data[$i]->tiposop;
					$rutas[$i]->profesion = $data[$i]->profesion;					
				}else {
					$estado = $estado + 1;
				}
			}
			if($estado == 0){
				echo json_encode($rutas);
			}else{
				echo '0.0';
			}
		}
	}


	function obtenerprofesion()
	{
		require_once('../../config/dbcon_prod.php');
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_PROFESION(:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
      	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}


	function obtener_esquema_soportes()
	{
		

		require_once('../../config/dbcon_prod.php');
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_SOPORTES(:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
      	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function mostrarSoportes() {
		global $request;
		$codigo = $request->codigo;
		$codigosemana = $request->codigosemana;
		require_once('../../config/dbcon_prod.php');
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_ADJUNTOS(:v_codigo,:v_codigo_semana,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_codigo',$codigo);
		oci_bind_by_name($consulta,':v_codigo_semana',$codigosemana);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
      	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}


	//PROCEDURE P_OBTENER_VALORES_EVAC    (v_pcodigo    in varchar2, 	v_psemana    in varchar2, 	v_json_row    out clob)
	function OBTENER_VALORES_EVAC()
	{
		global $request;
		require_once('../../config/dbcon_prod.php');
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_VALORES_EVAC(:v_pcodigo, :v_psemana, :v_json_row); end;');
		oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);
		oci_bind_by_name($consulta,':v_psemana',$request->codigosemana);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
      	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			header('Content-Type: application/json');
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}



	function obtenerEsquemaVacunacion()
	{
		global $request;
		$codigo = $request->codigo_desnutricion;
		$meses = $request->meses;
		$codigosemana = $request->codigosemana;
		require_once('../../config/dbcon_prod.php');
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_OBTENER_ESQUEMAVAC(:v_codigo_desnutricion, :v_meses, :v_codigo_semana, :v_json_row); end;');
		oci_bind_by_name($consulta,':v_codigo_desnutricion',$codigo);
		oci_bind_by_name($consulta,':v_meses',$meses);
		oci_bind_by_name($consulta,':v_codigo_semana',$codigosemana);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
      	oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			header('Content-Type: application/json');
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}


	

	function insertarEsquemaVacunacion()
	{
		global $request;
	
		$codigo = $request->codigo_desnutricion;
		$responsable = $request->responsable;
		$codigosemana = $request->codigosemana;
		require_once('../../config/dbcon_prod.php');
		$json = null;
		$valid = true;
				foreach($request->data as $item) {
					$consulta = oci_parse($c,'BEGIN PQ_GENESIS_DESNUTRICION.P_UI_EVAC(
						:v_codigo_desnutricion,
						:v_codigo_semana,
						:v_responsable,
						:v_pjson_row_in,
						:v_pjson_row_out
					); end;');
					unset($item->CODIGO);
					unset($item->NOMBRE);
					unset($item->RESPUESTA);
					unset($item->DETALLE);
					$item->codigo = (string) $item->codigo;
					$json_parametros = oci_new_descriptor($c, OCI_D_LOB);
					oci_bind_by_name($consulta,':v_codigo_desnutricion',$codigo);
					oci_bind_by_name($consulta,':v_codigo_semana',$codigosemana);
					oci_bind_by_name($consulta,':v_responsable',$responsable);
					oci_bind_by_name($consulta, ':v_pjson_row_in', $json_parametros, -1, OCI_B_CLOB);
					
					$json_parametros->writeTemporary(json_encode($item));
					$clob = oci_new_descriptor($c,OCI_D_LOB);
				
					oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
					
					oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
					
					if (isset($clob)) {
						$json = $clob->read($clob->size());
						$valid &= true;
					}else{
						$valid &= false;
					}
				}
		oci_close($c);

		if ($valid === true) {
			echo $json;
		} else {
			echo 0;
		}
	}