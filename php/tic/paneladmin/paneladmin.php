<?php
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
    $function();
    function getRole(){
        require_once('../../config/dbcon_prod.php');
        $consulta = oci_parse($c,'begin pq_genesis.p_obtener_roles (:v_pjson_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function getModulo(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $dataRegistro = json_decode($param->data);
        $consulta = oci_parse($c,'begin pq_genesis.p_obtener_jsonmodu (:v_prol,:v_pjson_row); end;');
        oci_bind_by_name($consulta,':v_prol',$dataRegistro->rol);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function getModuloBase(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $consulta = oci_parse($c,'begin pq_genesis.p_obtener_jsonbase(:v_pjson_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $jsonBase = $clob->read($clob->size());
        echo $jsonBase;
        oci_close($c);
    }
    function updateModulo(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $u_rol = json_decode($param->u_rol);
        $u_json = $param->u_json;
        $consulta = oci_parse($c,'begin pq_genesis.P_ACTUALIZA_SMOD (:v_prol,:v_pjsonin,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_prol',$u_rol);
        oci_bind_by_name($consulta,':v_pjsonin',$u_json);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
   }
   function getModuloUser(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $user = $param->user;
        $consulta = oci_parse($c,'begin pq_genesis.p_obtener_rol (:v_pusuario,:v_pjson_row); end;');
        oci_bind_by_name($consulta,':v_pusuario',$user);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }

?>
