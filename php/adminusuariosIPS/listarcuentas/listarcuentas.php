<?php
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
    $function();
    function getUsers(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $nit = json_decode($param->nit);
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_LISTA_USUARIOS_IPS (:v_pnit,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnit',$nit);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function detalleUsuario(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $nit = json_decode($param->nit);
        $documento  = $param->documento;
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_OBTENER_USUARIOS_IPS (:v_pnit,:v_pdocumento,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnit',$nit);
        oci_bind_by_name($consulta,':v_pdocumento',$documento);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function cambiarEstado(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $nit = json_decode($param->nit);
        $documento = json_decode($param->documento);
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_U_ESTADO_USUARIO(:v_pdocumento_usuario,:v_nit,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_nit',$nit);
        oci_bind_by_name($consulta,':v_pdocumento_usuario',$documento);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
    function actualizarUsuario(){
        require_once('../../config/dbcon_prod.php');
        global $param;
        $datos = json_decode($param->json);
        $consulta = oci_parse($c,'begin pq_genesis_inicio.P_EDITAR_FUNCIONARIO_IPS(:v_pnit,:v_pcedula,:v_pnombre,:v_pcostrasena,:v_pcelular,:v_ptelefono,:v_pcorreo,:v_pcargo,:v_pmodulos,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pnit',$datos->nit);
        oci_bind_by_name($consulta,':v_pcedula',$datos->numeroId);
        oci_bind_by_name($consulta,':v_pnombre',$datos->nombreUser);
        oci_bind_by_name($consulta,':v_pcostrasena',$datos->contrasenna_0);
        oci_bind_by_name($consulta,':v_pcelular',$datos->celular);
        oci_bind_by_name($consulta,':v_pcorreo',$datos->correo);
        oci_bind_by_name($consulta,':v_ptelefono',$datos->telefono);
        oci_bind_by_name($consulta,':v_pcargo',$datos->cargo);
        oci_bind_by_name($consulta,':v_pmodulos',$datos->modulos);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
    }
?>