<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();


function p_buscar_contratos() {
    require_once('../../config/dbcon_prod.php');
    global $request;

	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUT_CONFIG.P_BUSCAR_CONTRATOS(:v_pnumero,:v_pdocumento,:v_pestado,:v_pnit,:v_json_row); end;');
        oci_bind_by_name($consulta, ':v_pnumero', $request->numero);
        oci_bind_by_name($consulta, ':v_pdocumento',$request->documento);
        oci_bind_by_name($consulta, ':v_pestado',$request->estado);
        oci_bind_by_name($consulta, ':v_pnit', $request->nit);
		$clob = oci_new_descriptor($c, OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
		oci_execute($consulta, OCI_DEFAULT);								
		if (isset($clob)) {
			$json = $clob -> read($clob -> size());
			echo $json;
		} else {
			echo 0;
		}
		oci_close($c);
    }	
    

 
    function p_obtener_contrato() {
        require_once('../../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUT_CONFIG.P_OBTENER_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento ,:v_json_row); end;');
            oci_bind_by_name($consulta, ':v_pnumero',$request->numero);
            oci_bind_by_name($consulta, ':v_pubicacion',$request->ubicacion);
            oci_bind_by_name($consulta, ':v_pdocumento',$request->documento);
            $clob = oci_new_descriptor($c, OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
            oci_execute($consulta, OCI_DEFAULT);
                                    
            if (isset($clob)) {
                $json = $clob -> read($clob -> size());
                echo $json;
            } else {
                echo 0;
            }
            oci_close($c);
        }	


        function p_obtener_productos_cat_alterna_servicios_contrato() {
            require_once('../../config/dbcon_prod.php');
            global $request;
            $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_AUT_CONFIG.P_OBTENER_PRODUCTOS_CAT_ALTERNA_SERVICIOS_CONTRATO(:v_pnumero,:v_pubicacion,:v_pdocumento,:v_pproducto ,:v_json_row); end;');
                oci_bind_by_name($consulta, ':v_pnumero',$request->numero);
                oci_bind_by_name($consulta, ':v_pubicacion',$request->ubicacion);
                oci_bind_by_name($consulta, ':v_pdocumento',$request->documento);
                oci_bind_by_name($consulta, ':v_pproducto',$request->producto);
                $clob = oci_new_descriptor($c, OCI_D_LOB);
                oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
                oci_execute($consulta, OCI_DEFAULT);
                                        
                if (isset($clob)) {
                    $json = $clob -> read($clob -> size());
                    echo $json;
                } else {
                    echo 0;
                }
                oci_close($c);
            }	


  

?>
