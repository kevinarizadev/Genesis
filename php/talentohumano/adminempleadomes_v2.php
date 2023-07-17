<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
  // $hoy = date('mY');


function subir()
{
  global $request;
  $file = $request->archivobase;
  $name = $request->nombre;
  $ext = $request->ext;
  list(, $file) = explode(';', $file);
  list(, $file) = explode(',', $file);
  $file = base64_decode($file);
  file_put_contents('../../temp/' . $name . $ext, $file);
  echo 'temp/' . $name . $ext;
}

function guardarFiles()
{
  global $request;
  $file = $request->archivobase;
  $name = $request->nombre;
  $ext = $request->ext;
  list(, $file) = explode(';', $file);
  list(, $file) = explode(',', $file);
  $file = base64_decode($file);
  file_put_contents('../../images/Empleado_Mes/' . $name . $ext, $file);
  echo 'images/Empleado_Mes/' . $name . $ext;
}

function guardarRutas()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $rutas = $request->rutas;
  $longitud = $request->longitud;
  $responsable = $request->responsable;
  $estado = '';

  $consulta = oci_parse($c, 'begin PQ_GENESIS_TH.P_GUARDAR_EMPLEADO_MES_SLIDER(:v_pcantidad ,:v_pjson,
	:v_presponsable, :v_pestado, :v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pcantidad', $longitud);
	oci_bind_by_name($consulta, ':v_pjson', $rutas);
	oci_bind_by_name($consulta, ':v_presponsable', $responsable);
	oci_bind_by_name($consulta, ':v_pestado', $estado);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function limpiarDir()
{
  $files = glob('../../images/Empleado_Mes/*'); //obtenemos todos los nombres de los ficheros
  foreach ($files as $file) {
    if (is_file($file))
      unlink($file); //elimino el fichero
  }
}

function litarEmpleadosMes(){
	require_once('../config/dbcon_prod.php');
	$consulta = oci_parse($c, 'begin PQ_GENESIS_TH.P_LISTAR_EMPLEADO_MES_SLIDER(:v_pestado,:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	$clob2 = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pestado', $clob, -1, OCI_B_CLOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob2, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		$json2 = $clob2->read($clob2->size());
		//echo $json;
    echo '[{"datos":'.$json2.'},{ "estado":'.$json.'}]';
	} else {
		echo 0;
	}
	oci_close($c);
}

function swEmpleadoMes(){
  require_once('../config/dbcon_prod.php');
  global $request;
  $longitud = '';
  $rutas = '';
  $responsable = '';
  $estado = $request->estado;

  $consulta = oci_parse($c, 'begin PQ_GENESIS_TH.P_GUARDAR_EMPLEADO_MES_SLIDER(:v_pcantidad ,:v_pjson,
	:v_presponsable, :v_pestado, :v_pjson_row); end;');
	oci_bind_by_name($consulta, ':v_pcantidad', $longitud);
	oci_bind_by_name($consulta, ':v_pjson', $rutas);
	oci_bind_by_name($consulta, ':v_presponsable', $responsable);
  oci_bind_by_name($consulta, ':v_pestado', $estado);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
