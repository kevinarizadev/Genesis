<?php
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
    $function();
    function get_selet_rol(){
        require_once('../../config/dbcon_prod.php');
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_OBTENER_ROL(:v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function get_selet_area(){
        require_once('../../config/dbcon_prod.php');
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_OBTENER_AREA(:v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function get_selet_cargo(){
        require_once('../../config/dbcon_prod.php');
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_OBTENER_CARGO(:v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function get_funcionarios(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $filtro = $param->filtro;
        $codigo = $param->codigo;
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_OBTENER_FUNCIONARIOS_INTERNOS(:v_pfiltro,:v_pcodigo,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pfiltro',$filtro);
        oci_bind_by_name($consulta,':v_pcodigo',$codigo);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
   }
   function get_json(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $nit = $param->nit;
        $cedula = $param->cedula;
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_OBTENER_MODULOS(:v_pcedula,:v_pnit,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pcedula',$cedula);
        oci_bind_by_name($consulta,':v_pnit',$nit);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
   }
   function get_json_bi(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $nit = $param->nit;
        $cedula = $param->cedula;
        $consulta = oci_parse($c,'begin PQ_GENESIS_INICIO.P_OBTENER_MODULOS_BI(:v_pcedula,:v_pnit,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pcedula',$cedula);
        oci_bind_by_name($consulta,':v_pnit',$nit);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo "[]";
        }
        oci_close($c);
    }
   function get_info_user(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $nit = $param->nit;
        $cedula = $param->cedula;
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_OBTENER_INFO_USUARIO(:v_pcedula,:v_pnit,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pcedula',$cedula);
        oci_bind_by_name($consulta,':v_pnit',$nit);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
   }
   function get_json_modulos_admin(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $tipo = $param->tipo;
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_OBTENER_MODULOS_ADMIN(:v_ptipo,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_ptipo',$tipo);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
   function set_json_user(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $nit = $param->nit;
        $cedula = $param->cedula;
        $responsable = $param->responsable;
        $json = $param->json;
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_ACTUALIZA_MODULOS(:v_pcedula,:v_presponsable,:v_pnit,:v_pjson,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pcedula',$cedula);
        oci_bind_by_name($consulta,':v_presponsable',$responsable);
        oci_bind_by_name($consulta,':v_pnit',$nit);
        oci_bind_by_name($consulta,':v_pjson',$json);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
?>
