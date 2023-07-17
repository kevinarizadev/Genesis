<?php
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
    $function();
    function registrarUserAdmin(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $datos = json_decode($param->json);
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_CREAR_USUARIOIPS(:v_pnit,:v_pdocumento_usuario,:v_pnombre_usuario,:v_pclave,:v_pcargo,:v_pcelular,:v_ptelefono,:v_pcorreo,:v_pmodulos,:v_tipo,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnit',$datos->nit);
        oci_bind_by_name($consulta,':v_pdocumento_usuario',$datos->numeroId);
        oci_bind_by_name($consulta,':v_pnombre_usuario',$datos->nombreUser);
        oci_bind_by_name($consulta,':v_pclave',$datos->contrasenna_0);
        oci_bind_by_name($consulta,':v_pcargo',$datos->cargo);
        oci_bind_by_name($consulta,':v_pcelular',$datos->celular);
        oci_bind_by_name($consulta,':v_ptelefono',$datos->telefono);
        oci_bind_by_name($consulta,':v_pcorreo',$datos->correo);
        oci_bind_by_name($consulta,':v_pmodulos',$datos->modulos);
        oci_bind_by_name($consulta,':v_tipo',$datos->tipo);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
?>