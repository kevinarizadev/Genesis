<?php
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
    $function();
    
    function obtener_datos_jefe(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $cedula = $param->cedula;
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_OBTENER_DATOS_JEFE(:v_pcedula,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pcedula',$cedula);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function actualizar_jefe(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $cedula_jefe = $param->cedula_jefe;
        $cedula_funcionarios = $param->cedula_funcionarios;
        $cantidad = $param->cantidad;
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_ACTULIZA_JEFE(:v_pcedula_jefe,:v_pcedula_funcionarios,:v_pcantidad,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pcedula_jefe',$cedula_jefe);
        oci_bind_by_name($consulta,':v_pcedula_funcionarios',$cedula_funcionarios);
        oci_bind_by_name($consulta,':v_pcantidad',$cantidad);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
   }
?>
