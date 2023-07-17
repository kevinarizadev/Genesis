<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
//var_dump($_POST);

function guardar_tercero(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $tercero         = $request->tercero;
  $anno          	 = $request->anno;
  $periodo         = $request->periodo;
  $responsable 		 = $request->cedula;

  $consulta = oci_parse($c,'begin PQ_GENESIS_1587.P_I_HABILITACION_TERCERO(:v_ptercero, :v_panno, :v_pperiodo, :v_presponsable, :v_json_row); end;');
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta,':v_ptercero',$tercero);
  oci_bind_by_name($consulta,':v_panno',$anno);
  oci_bind_by_name($consulta,':v_pperiodo',$periodo);
  oci_bind_by_name($consulta,':v_presponsable',$responsable);
  oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
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
