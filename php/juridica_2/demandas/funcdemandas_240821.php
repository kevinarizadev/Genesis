 <?php 
    // error_reporting(0);
    header("Content-Type: text/html;charset=utf-8");
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();

    //GUARDA ARCHIVOS AL FTP        
    function guardarAdjuntosDemandas(){
        require_once('../../config/dbcon_prod.php');
        //require_once('../../config/ftpcon.php');
        include('../../upload_file/subir_archivo.php');
        global $request;
        $hoy = date('dmY');
        $path = '/cargue_ftp/Digitalizacion/Genesis/Demandas/'.$hoy.'/';
        $data = $request->data;
        $ext = $request->ext;
        $subio = subirArchivoFTP_Demandas($data,$path,uniqid(),$ext);
        if ($subio != '0') {
             echo $subio;
        }else {
            echo '0';
        }
    }

    //BUSQUEDA DE DEMANDANTE
    function buscarDemandante() {
        require_once('../../config/dbcon_prod.php');
        global $request;
        $documento = $request->documento;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_DEMANDAS.P_BUSQUEDA_DEMANDANTE(:v_pnumero_documento,:v_respuesta); end;');
        oci_bind_by_name($consulta, ':v_pnumero_documento', $documento);
        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob -> read($clob -> size());
            echo $json;
        } else {
            echo 0;
        }
        oci_close($c);
    }

    function listaDepartamentos(){
		require_once('../../config/dbcon_prod.php');
        $consulta = oci_parse($c,'begin pq_genesis_parametros.p_lista_departamentos(:v_respuesta); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
        oci_close($c);
    }

    function listaMunicipios(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        // $departamento='8000';
        // var_dump($departamento);
        $consulta = oci_parse($c,'begin pq_genesis_parametros.p_lista_municipios(:v_departamento,:v_respuesta); end;');
        // oci_bind_by_name($consulta,':v_departamento',$departamento);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_departamento',$request->departamento);
		oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
        oci_close($c);
    }

    function listatiposjurisdiccion(){
		require_once('../../config/dbcon_prod.php');
        $consulta = oci_parse($c,'begin pq_genesis_demandas.p_lista_tipos_jurisdiccion(:v_respuesta); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
        oci_close($c);
    }

    function listatiposprocesos(){
        require_once('../../config/dbcon_prod.php');
		global $request;
		//echo ($request->tipojurisdiccion);
        $consulta = oci_parse($c,'begin pq_genesis_demandas.p_lista_tipos_proceso(:v_jurisdiccion,:v_respuesta); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_jurisdiccion',$request->tipojurisdiccion);
		oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
        oci_close($c);
    }

    function registraDemanda(){
		require_once('../../config/dbcon.php');
		global $request;
		$dataRegistro = json_decode($request->dataRegistro);
		$numero = '';
		if ($dataRegistro->actividad == 'U') {
			$numero = $dataRegistro->codigo_demanda;
			//$dataRegistro->ubicmunicipio = $dataRegistro->ubicacion;
			// $dataRegistro->estado = $dataRegistro->ubicacion;
		}
		// echo ($_SESSION['cedula']);
		// echo($dataRegistro->estado);
		// echo($dataRegistrodemte);
		$consulta = oci_parse($c,'begin pq_genesis_demandas.p_uid_demanda(:v_accion,
																		  :v_numero,
																		  :v_ubicacion,
																		  :v_juzgado,
																		  :v_radicacion,
																		  :v_codigo_jurisdiccion,
																		  :v_codigo_tipo_proceso,
																		  :v_descripcion,
																		  :v_cuantia,
																		  :v_prob_perdida,
																		  :v_usuario_registro,
																		  :v_demandantes,
																		  :v_cantidad_demandantes,
																		  :v_demandados,
																		  :v_cantidad_demandados,
																		  :v_apoderados,
																		  :v_fecha_embargo,
																		  :v_valor_embargo,
																		  :v_fecha_desembargo,
																		  :v_estado,
																		  :v_respuesta); end;');
		oci_bind_by_name($consulta,':v_accion',$dataRegistro->actividad);
     	oci_bind_by_name($consulta,':v_numero',$numero);
		oci_bind_by_name($consulta,':v_ubicacion',$dataRegistro->ubicmunicipio);
		oci_bind_by_name($consulta,':v_juzgado',$dataRegistro->juzgado);
		oci_bind_by_name($consulta,':v_radicacion',$dataRegistro->radicacion);
		oci_bind_by_name($consulta,':v_codigo_jurisdiccion',$dataRegistro->tipojurisdiccion);
		oci_bind_by_name($consulta,':v_codigo_tipo_proceso',$dataRegistro->tipoproceso);
		oci_bind_by_name($consulta,':v_descripcion',$dataRegistro->descripcion);
		oci_bind_by_name($consulta,':v_cuantia',$dataRegistro->cuantia);
		oci_bind_by_name($consulta,':v_prob_perdida',$dataRegistro->probabilidad);
		oci_bind_by_name($consulta,':v_usuario_registro',$_SESSION['cedula']);
		oci_bind_by_name($consulta,':v_cantidad_demandantes',$dataRegistro->cantdemandantes);
		oci_bind_by_name($consulta,':v_cantidad_demandados',$dataRegistro->cantdemandados);
		oci_bind_by_name($consulta,':v_fecha_embargo',$dataRegistro->tempFechaRecEmbargo);
		oci_bind_by_name($consulta,':v_valor_embargo',$dataRegistro->valorembargo);
		oci_bind_by_name($consulta,':v_fecha_desembargo',$dataRegistro->tempFechaDesembargo);
		oci_bind_by_name($consulta,':v_estado',$dataRegistro->estado);

		$jsondemandantess = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_demandantes', $jsondemandantess, -1, OCI_B_CLOB);
		$jsondemandantess->writeTemporary($dataRegistro->jsondemandantes);

		$jsondemandadoss = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_demandados', $jsondemandadoss, -1, OCI_B_CLOB);
		$jsondemandadoss->writeTemporary($dataRegistro->jsondemandados);
		
		$jsonapoderados = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_apoderados', $jsonapoderados, -1, OCI_B_CLOB);
		$jsonapoderados->writeTemporary($dataRegistro->jsonapoderado);
		
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_respuesta',$clob,-1,OCI_B_CLOB);
		
		oci_execute($consulta,OCI_DEFAULT);
		$respuesta = $clob->read($clob->size());
		echo $respuesta;
		oci_close($c);
	}

	function obtenerdemanda(){
		require_once('../../config/dbcon.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_demandas.p_obtener_demanda(:v_codigo_demanda,:v_respuesta); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_codigo_demanda',$request->numerodemanda);
		oci_bind_by_name($consulta,':v_respuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
	}

	function registraactuacion(){
		require_once('../../config/dbcon.php');
		global $request;
		// echo($request);
		$accion=$request->accion;
		$codigo_actuacion="";
		$codigo_demanda=$request->codigo_demanda;
		$fecha=$request->fecha;
		$nombre=$request->nombre;
		$descripcion=$request->descripcion;
		$tipo_archivo=$request->tipo_archivo;
		if ($request->tipo_archivo == 'A') {
			$ruta_archivo = $request->ruta;
		}else{
			$ruta_archivo = $request->url;
		}
		// echo($request->dataRegistro);
		// echo($request->accion);
		$consulta = oci_parse($c,'begin pq_genesis_demandas.p_uid_actuacion(:v_accion,
																	:v_codigo_actuacion,
																	:v_codigo_demanda,
																	:v_fecha_actuacion,
																	:v_nombre,
																	:v_descripcion,
																	:v_ruta_archivo,
																	:v_tipo_archivo,
																	:v_respuesta); end;');
		oci_bind_by_name($consulta,':v_accion',$accion);
        oci_bind_by_name($consulta,':v_codigo_actuacion',$codigo_actuacion);
		oci_bind_by_name($consulta,':v_codigo_demanda',$codigo_demanda);
		oci_bind_by_name($consulta,':v_fecha_actuacion',$fecha);
		oci_bind_by_name($consulta,':v_nombre',$nombre);
		oci_bind_by_name($consulta,':v_descripcion',$descripcion);
		oci_bind_by_name($consulta,':v_ruta_archivo',$ruta_archivo);
		oci_bind_by_name($consulta,':v_tipo_archivo',$tipo_archivo);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_respuesta',$clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$respuesta = $clob->read($clob->size());
		echo $respuesta;
		oci_close($c);
   }
   
   	function listaactuaciones(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		//echo ($request->tipojurisdiccion);
		$consulta = oci_parse($c,'begin pq_genesis_demandas.p_lista_actuaciones(:v_codigo_demanda,:v_respuesta); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_codigo_demanda',$request->codigo_demanda);
		oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
   	}

   	function filtroprestadores(){
		require_once('../../config/dbcon_prod.php');
		global $request;
		// echo ($request->busqueda);
		$consulta = oci_parse($c,'begin pq_genesis_demandas.p_filtro_prestadores(:v_busqueda,:v_respuesta); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta,':v_busqueda',$request->busqueda);
		oci_bind_by_name($consulta, ':v_respuesta', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
   	}
?>