
<?php
    $postdata = file_get_contents("php://input");
    $param = json_decode($postdata);
    $function = $param->function;
    $function();

    function buscar_usuario_ips(){
        require_once('../config/dbcon_prod.php');
        global $param;
        if (isset($_SESSION['cedula']) && isset($param->nit)) {
            $nit = $param->nit;
            $usuario = $_SESSION['cedula'];
            $consulta = oci_parse($c,'begin PQ_GENESIS_RIPS.P_OBTENER_USUARIOS_IPS(:v_pusuario,:v_pnit,:v_pjson_row); end;');
            oci_bind_by_name($consulta,':v_pnit',$nit);
            oci_bind_by_name($consulta,':v_pusuario',$usuario);
            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta);
            $json = $clob->read($clob->size());
            echo $json;
        } else {
            echo '[]';
        }
        
        oci_close($c);
   }

   function ActualizarAdmin()
{
  require_once('../config/dbcon_prod.php');
  global $param;
  // echo 'nit->' . $param->nit;
  // echo 'AdminOld->' . $param->adminAct;
  // echo 'AdminNew->' . $param->adminNew;
  $estado = 'I';

  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_RIPS.p_cambiar_admin_ips(:v_pnit ,:v_padminactual, :v_pestado, :v_padminnuevo ,:v_pjson ); end;');
  oci_bind_by_name($consulta, ':v_pnit', $param->nit);
  oci_bind_by_name($consulta, ':v_padminactual', $param->adminAct);
  oci_bind_by_name($consulta, ':v_pestado', $estado);
  oci_bind_by_name($consulta, ':v_padminnuevo', $param->adminNew);
  oci_bind_by_name($consulta, ':v_padminnuevo', $param->adminNew);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function registrarUserAdmin(){
  require_once('../config/dbcon_prod.php');
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