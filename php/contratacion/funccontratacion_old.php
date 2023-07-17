<?php
	$postdata = file_get_contents("php://input");
	//error_reporting(0);
    $request = json_decode($postdata);
	$function = $request->function;
	$function();

	function buscarContratos(){
	    require_once('../config/dbcon_pru.php');
	    global $request;
	    $numero = $request->numero;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_BUSCAR_CONTRATOS(:v_pnumero,:v_json_row); end;');
	    oci_bind_by_name($consulta,':v_pnumero',$numero);
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

    function obtenerContrato(){
	    require_once('../config/dbcon_pru.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pdocumento',$documento);
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
    function obtenerServiciosContrato(){
	    require_once('../config/dbcon_pru.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_SERVICIOS_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pdocumento',$documento);
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

    function obtenerProductosServicioContrato(){
	    require_once('../config/dbcon_pru.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
        $servicio = $request->servicio;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_PRODUCTOS_SERVICIOS_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_pservicio,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pdocumento',$documento);
        oci_bind_by_name($consulta,':v_pservicio',$servicio);
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

    function obtenerModificacionesContrato(){
	    require_once('../config/dbcon_pru.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_MODIFICACIONES_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pdocumento',$documento);
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

    function obtenerTareasContrato(){
	    require_once('../config/dbcon_pru.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_TAREAS_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pdocumento',$documento);
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

    function obtenerPolizasContrato(){
	    require_once('../config/dbcon_pru.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_POLIZAS_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pdocumento',$documento);
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

    function obtenerDepartamentosContrato(){
	    require_once('../config/dbcon_pru.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_DEPARTAMENTO_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pdocumento',$documento);
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

    function obtenerMunicipiosContratoDepartamento(){
	    require_once('../config/dbcon_pru.php');
	    global $request;
        $numero = $request->numero;
        $ubicacion = $request->ubicacion;
        $documento = $request->documento;
        $departamento = $request->departamento;
	    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONTRATACION.P_OBTENER_MUNICIPIOS_CONTRATO_DEPARTAMENTO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_pdepartamento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
        oci_bind_by_name($consulta,':v_pdocumento',$documento);
        oci_bind_by_name($consulta,':v_pdepartamento',$departamento);
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

    
?>
