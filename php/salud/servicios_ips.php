<?php
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
    $function();
    function buscar_servicios_contra(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $tipo = $param->tipo;
        $texto = $param->texto;
        $consulta = oci_parse($c,'begin PQ_SUFICIENCIA.P_LISTA_SERVICIO_CONTRA(:v_ptipo,:v_ptexto,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_ptipo',$tipo);
        oci_bind_by_name($consulta,':v_ptexto',$texto);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
   }
   function listar_departamento(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $tipo = $param->tipo;
        $texto = $param->texto;
        $consulta = oci_parse($c,'begin PQ_SUFICIENCIA.P_OBTENER_SERVICIOS_DPTO(:v_ptipo,:v_ptexto,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_ptipo',$tipo);
        oci_bind_by_name($consulta,':v_ptexto',$texto);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function listar_municipios(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $tipo = $param->tipo;
        $texto = $param->texto;
        $departamento = $param->departamento;
        $consulta = oci_parse($c,'begin PQ_SUFICIENCIA.P_OBTENER_SERVICIOS_MUN(:v_ptipo,:v_ptexto,:v_pdpto,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_ptipo',$tipo);
        oci_bind_by_name($consulta,':v_ptexto',$texto);
        oci_bind_by_name($consulta,':v_pdpto',$departamento);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function listar_ips(){
        require_once('../config/dbcon_prod.php');
        global $param;
        $tipo = $param->tipo;
        $texto = $param->texto;
        $municipio = $param->municipio;
        $consulta = oci_parse($c,'begin PQ_SUFICIENCIA.P_OBTENER_SERVICIOS_IPS(:v_ptipo,:v_ptexto,:v_pmun,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_ptipo',$tipo);
        oci_bind_by_name($consulta,':v_ptexto',$texto);
        oci_bind_by_name($consulta,':v_pmun',$municipio);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
?>
