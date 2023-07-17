<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function VerificarCargeDeSoporteSisben(){
  require_once('../config/dbcon_prod.php');
  global $request;
  // $v_pdocumento = $request->v_pdocumento;
  // $v_ptipodocumento = $request->v_ptipodocumento;
  //$tipo = $request->tipo;
  $consulta = oci_parse($c,'begin pq_genesis_ca.p_obtener_soporte (:v_pdocumento,:v_ptipodocumento,:v_json_row); end;');
  oci_bind_by_name($consulta,':v_pdocumento',$request->v_pdocumento);
  oci_bind_by_name($consulta,':v_ptipodocumento',$request->v_ptipodocumento);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}
function obtenermunicipio(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta =  oci_parse($c,"SELECT CODIGO, NOMBRE FROM VW_MUNICIPIO");
  oci_execute($consulta);
  $rows = array();while($row = oci_fetch_assoc($consulta))
  {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  oci_close($c);
}
function obtenerentidad(){
  require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c,"SELECT CODIGO, NOMBRE FROM VW_ENTIDAD");
    oci_execute($consulta);
  $rows = array();while($row = oci_fetch_assoc($consulta))
  {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  oci_close($c);
}
function obtenerescenarios(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $municipio   = $request->municipio;
  $consulta =  oci_parse($c,"SELECT CODIGO, NOMBRE FROM VW_ESCENARIO V WHERE V.Paqn_Ubicacion = :v_ubicacion");
  oci_bind_by_name($consulta,':v_ubicacion',$municipio);
  oci_execute($consulta);
  $rows = array();while($row = oci_fetch_assoc($consulta))
  {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  oci_close($c);
}
function obteneragrupoPoblacional(){
  require_once('../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c,"SELECT CODIGO, NOMBRE FROM VW_GPOBLACIONAL ORDER BY CODIGO");
    oci_execute($consulta);
  $rows = array();while($row = oci_fetch_assoc($consulta))
  {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  oci_close($c);
}
function nucleofamiliar(){
  require_once('../config/dbcon_prod.php');
  global $request;
  //$tipo_afiliado = 'O';//$_POST['tipo_afiliado'];
  $consulta = oci_parse($c,'begin pq_genesis_ca.p_acb_agrega_ben_acb (:v_ptipo_documento,:v_pdocumento,:v_ptipo_documento_cab,:v_pdocumento_cab,:v_ptipo_afiliado,:v_parentezco,:v_json_row); end;');
  oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipo_documento);
  oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
  oci_bind_by_name($consulta,':v_ptipo_documento_cab',$request->ti_documento_cab);
  oci_bind_by_name($consulta,':v_pdocumento_cab',$request->documento_cab);
  oci_bind_by_name($consulta,':v_ptipo_afiliado',$request->tipo_afiliado);
  oci_bind_by_name($consulta,':v_parentezco',$request->parentezco);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}
function DevinculacionBeneficiario(){
  require_once('../config/dbcon_prod.php');
  global $request;
  //$tipo_afiliado = 'F';//$_POST['tipo_afiliado'];
  $consulta = oci_parse($c,'begin pq_genesis_ca.p_abc_desvincular_ben_cab(:v_ptipo_documento,:v_pdocumento,:v_json_row); end;');
  oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipo_documento);
  oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}
function afiliados_ficha(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c,'begin pq_genesis_ca.p_lista_afiliados_ficha(:v_ptipo_documento,:v_pdocumento,:v_ficha_sisben,:v_municipio,:v_json_row); end;');
  oci_bind_by_name($consulta,':v_ficha_sisben',$request->ficha_sisben);
  oci_bind_by_name($consulta,':v_municipio',$request->municipio_afiliado);
  oci_bind_by_name($consulta,':v_ptipo_documento',$request->tipo_documento);
  oci_bind_by_name($consulta,':v_pdocumento',$request->documento);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}
function ValidaACB(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $t_documento = $request->t_documento;
  $n_documento = $request->n_documento;
  $parentesco = isset($request->parentesco) ? $request->parentesco : '';
  $municipio = $request->municipio;
  $escenario = $request->escenario;
  $gpoblacional = $request->gpoblacional;
  $ficha_sisben = $request->ficha_sisben;
  $n_sisben = $request->n_sisben;
  $puntaje_sisben = $request->puntaje_sisben;
  $discapacidad = $request->discapacidad;
  $zona = $request->zona;
  $direccion = $request->direccion;
  $barrio = isset($request->barrio) ? $request->barrio : '';
  // $barrio =$request->barrio;
  $celular = $request->celular;

  $consulta = oci_parse($c,'begin PQ_GENESIS_NO.p_valida_cambio_acb(  :v_tipo_documento,
                                                                      :v_documento,
                                                                      :v_new_parentesco,
                                                                      :v_new_municipio,
                                                                      :v_new_escenario,
                                                                      :v_new_gpoblacional,
                                                                      :v_new_ficha_sisben,
                                                                      :v_new_nivel_sisben,
                                                                      :v_new_puntaje_sisben,
                                                                      :v_new_discapacidad,
                                                                      :v_new_zona,
                                                                      :v_new_direccion,
                                                                      :v_new_barrio,
                                                                      :v_new_celular,
                                                                      :v_json_row); end;');
  oci_bind_by_name($consulta,':v_tipo_documento',$t_documento);
  oci_bind_by_name($consulta,':v_documento',$n_documento);
  oci_bind_by_name($consulta,':v_new_parentesco',$parentesco);
  oci_bind_by_name($consulta,':v_new_municipio',$municipio);
  oci_bind_by_name($consulta,':v_new_escenario',$escenario);
  oci_bind_by_name($consulta,':v_new_gpoblacional',$gpoblacional);
  oci_bind_by_name($consulta,':v_new_ficha_sisben',$ficha_sisben);
  oci_bind_by_name($consulta,':v_new_nivel_sisben',$n_sisben);
  oci_bind_by_name($consulta,':v_new_puntaje_sisben',$puntaje_sisben);
  oci_bind_by_name($consulta,':v_new_discapacidad',$discapacidad);
  oci_bind_by_name($consulta,':v_new_zona',$zona);
  oci_bind_by_name($consulta,':v_new_direccion',$direccion);
  oci_bind_by_name($consulta,':v_new_barrio',$barrio);
  oci_bind_by_name($consulta,':v_new_celular',$celular);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  }else{
    echo 0;
  }
  oci_close($c);
}

function p_guardar_info_sisben_agrupacion(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $data = $request->data;
  $responsable = $_SESSION['cedula'];
  $consulta = oci_parse($c,'begin pq_genesis_ca.p_guardar_info_sisben_agrupacion(:v_info_sisben,:v_responsable,:v_json_row); end;');  
  $json_parametros = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_info_sisben', $json_parametros, -1, OCI_B_CLOB);
  $json_parametros->writeTemporary(json_encode($data));  
  oci_bind_by_name($consulta,':v_responsable',$responsable);
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
