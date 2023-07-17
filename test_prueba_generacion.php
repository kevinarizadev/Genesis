<?php

function test()
{

  $codigo_asesor = "1045747968";
$codigo_empresa = "32658939";
$doc_usuario = "32658939";
$fecha = "13/06/2023";
// $function = "guardarAfiliacion";
$observacion = "1";
$responsable = "1045747968";
$tipo_doc_empresa = "N";
$tipo_doc_usuario = "CC";
$tipo_proceso = "A";
$ubi_responsable = "1";

// movilidad/seguimiento_asesores/funcseguimiento.php
  require('./php/config/dbcon_produccion.php');
  $consulta = oci_parse($c,'BEGIN PQ_GENESIS_HELISOFT.p_registrar_formulario(:v_fecha,
                                                                              :v_codigo,
                                                                              :v_tipo_usuario,
                                                                              :v_usuario,
                                                                              :v_tipo_empresa,
                                                                              :v_cod_empresa,
                                                                              :v_razon_social,
                                                                              :v_observacion,
                                                                              :v_responsable,
                                                                              :v_ubi_responsable,
                                                                              :v_proceso,
                                                                              :v_json_res); end;');
  oci_bind_by_name($consulta,':v_fecha',$fecha);
  oci_bind_by_name($consulta,':v_codigo',$codigo_asesor);
  oci_bind_by_name($consulta,':v_tipo_usuario',$tipo_doc_usuario);
  oci_bind_by_name($consulta,':v_usuario',$doc_usuario);
  oci_bind_by_name($consulta,':v_tipo_empresa',$tipo_doc_empresa);
  oci_bind_by_name($consulta,':v_cod_empresa',$codigo_empresa);
  oci_bind_by_name($consulta,':v_razon_social',$nombre_empresa);
  oci_bind_by_name($consulta,':v_observacion',$observacion);
  oci_bind_by_name($consulta,':v_responsable',$responsable);
  oci_bind_by_name($consulta,':v_ubi_responsable',$ubi_responsable);
  oci_bind_by_name($consulta,':v_proceso',$tipo_proceso);
  $clob = oci_new_descriptor($c,OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta,OCI_DEFAULT);
  if (isset($clob)) {
      $json = $clob->read($clob->size());
      echo $json;
  }else{
      echo 0;
  }
  oci_close($c);

}

test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
test();
