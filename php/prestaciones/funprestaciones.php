<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function ConsultarCertificado(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $tipo = $request->tipo;
  $documento = $request->documento;
  $inicial = $request->inicial;
  $final = $request->final;
  $consulta = oci_parse($c,'begin pq_genesis_prestaciones.p_certificado_prestaciones (:v_tipo,:v_afiliado,:v_fecha_inicial,:v_fecha_final,:v_json_out); end;');
  oci_bind_by_name($consulta,':v_tipo',$tipo);
  oci_bind_by_name($consulta,':v_afiliado',$documento);
  oci_bind_by_name($consulta,':v_fecha_inicial',$inicial);
  oci_bind_by_name($consulta,':v_fecha_final',$final);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_out', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}

function p_validacion_certificado(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $tipo = $request->tipo;
  $documento = $request->documento;
  $inicial = $request->inicial;
  $final = $request->final;
  $consulta = oci_parse($c,'begin pq_genesis_prestaciones.p_validacion_certificado (:v_tipo,:v_afiliado,:v_fecha_inicial,:v_fecha_final,:v_json_out); end;');
  oci_bind_by_name($consulta,':v_tipo',$tipo);
  oci_bind_by_name($consulta,':v_afiliado',$documento);
  oci_bind_by_name($consulta,':v_fecha_inicial',$inicial);
  oci_bind_by_name($consulta,':v_fecha_final',$final);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_out', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}



  function ConsultarCertificadoCartera(){
    require_once('../config/dbcon_cartera.php');  
    global $request;
    $nit = $request->nit;
    $selectConsolPila= "SELECT DISTINCT TIPO_DOCUMENTO_APORTANTE,NIT,NOMBRE_EMPRESA,APO_DIRECCION,APO_TELEFONO ,DEPARTAMENTO,MUNICIPIO FROM BD_MORA WHERE NIT IN ('$nit');";
    $row = array();
    $rows= array();
    $stmt=sqlsrv_query($conn,$selectConsolPila);
    if( $stmt === false) { die( print_r( sqlsrv_errors(), true) );}
    
    while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
      $rows[] = $row;
    }    
    echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    sqlsrv_free_stmt( $stmt);
  }
  function ConsultarCertificadoCarteraDetalle(){
    require_once('../config/dbcon_cartera.php');  
    global $request;
    $nit = $request->nit;
    $selectConsolPila= "SELECT NUMERO_DOCUMENTO DOCUMENTO,PRIMER_APELLIDO+' '+SEGUNDO_APELLIDO+' '+PRIMER_NOMBRE+' '+SEGUNDO_NOMBRE NOMBRE,DIAS DIAS,PERIODO PERIODO FROM BD_MORA WHERE NIT IN ('$nit');";
    $row = array();
    $rows= array();
    $stmt=sqlsrv_query($conn,$selectConsolPila);
    if( $stmt === false) { die( print_r( sqlsrv_errors(), true) );}
    
    while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
      $rows[] = $row;
    }    
    echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    sqlsrv_free_stmt( $stmt);
  }




?>
