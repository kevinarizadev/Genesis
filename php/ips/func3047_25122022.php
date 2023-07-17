<?php
error_reporting(0);
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function ConsultarAfiliado()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $vtipo = $request->tipo;
  $v_numero = $request->numero;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_consultar_afiliado (:v_tipo,:v_documento,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_tipo', $vtipo);
  oci_bind_by_name($consulta, ':v_documento', $v_numero);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}

function tipo_documentos()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_obtener_tipos_documental (:v_json_res); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}

function GuardarAfiliado()
{

  require_once('../config/dbcon_prod.php');
  global $request;
  $tipodocumento = $request->tipodocumento;
  $documento = $request->numero;
  $pnombre = $request->primer_nombre;
  $snombre = $request->segundo_nombre;
  $papellido = $request->primer_apellido;
  $sapellido = $request->segundo_apellido;
  $genero = $request->sexo;
  $fecha = $request->nacimiento;
  $responsable = $request->responsable;
  $nit = $request->nit;
  $tipo_proceso = $request->tipo_proceso;
  $tipodocumento_cabeza = $request->tipodocumento_cabeza;
  $documento_cabeza = $request->documento_cabeza;
  $ruta = $request->ruta;
  $direccion = $request->dirrecion;
  $telefono = $request->celular;
  $correo = $request->correo;
  $regimen = $request->regimen;

  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_insertar_afiliado (:v_ptipodocumento,
                                                                        :v_pnumerodocumento,
                                                                        :v_pprimernombre,
                                                                        :v_psegundonombre,
                                                                        :v_pprimerapellido,
                                                                        :v_psegundoapellido,
                                                                        :v_pgenero,
                                                                        :v_pfechanacimiento,
                                                                        :v_presponsable,
                                                                        :v_nit,
                                                                        :v_tipo_registro,
                                                                        :v_ptipodocumento_cabeza,
                                                                        :v_pnumerodocumento_cabeza,
                                                                        :v_ruta,
                                                                        :v_movil_afiliado,
                                                                        :v_email,
                                                                        :v_direccion,   
                                                                        :v_regimen,   
                                                                        :v_json_row); end;');
  oci_bind_by_name($consulta, ':v_ptipodocumento', $tipodocumento);
  oci_bind_by_name($consulta, ':v_pnumerodocumento', $documento);
  oci_bind_by_name($consulta, ':v_pprimernombre', $pnombre);
  oci_bind_by_name($consulta, ':v_psegundonombre', $snombre);
  oci_bind_by_name($consulta, ':v_pprimerapellido', $papellido);
  oci_bind_by_name($consulta, ':v_psegundoapellido', $sapellido);
  oci_bind_by_name($consulta, ':v_pgenero', $genero);
  oci_bind_by_name($consulta, ':v_pfechanacimiento', $fecha);
  oci_bind_by_name($consulta, ':v_presponsable', $responsable);
  oci_bind_by_name($consulta, ':v_nit', $nit);
  oci_bind_by_name($consulta, ':v_tipo_registro', $tipo_proceso);
  oci_bind_by_name($consulta, ':v_ptipodocumento_cabeza', $tipodocumento_cabeza);
  oci_bind_by_name($consulta, ':v_pnumerodocumento_cabeza', $documento_cabeza);
  oci_bind_by_name($consulta, ':v_ruta', $ruta);
  oci_bind_by_name($consulta, ':v_movil_afiliado', $telefono);
  oci_bind_by_name($consulta, ':v_email', $correo);
  oci_bind_by_name($consulta, ':v_direccion', $direccion);
  oci_bind_by_name($consulta, ':v_regimen', $regimen);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function ActualizarInformacion()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $codigo = $request->codigo;
  $tipodocumento = $request->tipodocumento;
  $documento = $request->documento;
  $pnombre = $request->pnombre;
  $snombre = $request->snombre;
  $papellido = $request->papellido;
  $sapellido = $request->sapellido;
  $genero = $request->genero;
  $fecha_nacimiento = $request->fecha_nacimiento;
  $direccion = $request->direccion;
  $telefono = $request->telefono;
  $correo = $request->correo;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_actualizar_afiliado (:v_codigo_afiliado,
                                                                          :v_tipo_documento,
                                                                          :v_documento,
                                                                          :v_primer_nombre,
                                                                          :v_segundo_nombre,
                                                                          :v_primer_apellido,
                                                                          :v_segundo_apellido,
                                                                          :v_genero,
                                                                          :v_fecha_nacimiento,
                                                                          :v_movil_afiliado,
                                                                          :v_email,
                                                                          :v_direccion,      
                                                                          :v_json_row); end;');
  oci_bind_by_name($consulta, ':v_codigo_afiliado', $codigo);
  oci_bind_by_name($consulta, ':v_tipo_documento', $tipodocumento);
  oci_bind_by_name($consulta, ':v_documento', $documento);
  oci_bind_by_name($consulta, ':v_primer_nombre', $pnombre);
  oci_bind_by_name($consulta, ':v_segundo_nombre', $snombre);
  oci_bind_by_name($consulta, ':v_primer_apellido', $papellido);
  oci_bind_by_name($consulta, ':v_segundo_apellido', $sapellido);
  oci_bind_by_name($consulta, ':v_genero', $genero);
  oci_bind_by_name($consulta, ':v_fecha_nacimiento', $fecha_nacimiento);
  oci_bind_by_name($consulta, ':v_movil_afiliado', $telefono);
  oci_bind_by_name($consulta, ':v_email', $correo);
  oci_bind_by_name($consulta, ':v_direccion', $direccion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function CargarSoportes()
{
  global $request;
  $archivos = json_decode($request->archivos);
  $tipodocumento = $request->tipodocumento;
  $documento = $request->numero;
  $hoy = date('dmY');
  $ruta = 'IPS/' . $hoy;
  $estado = 0;
  $rutas = [];
  require('../sftp_cloud/UploadFile.php');
  for ($i = 0; $i < count($archivos); $i++) {
    // echo $archivos[$i]->extension;
    $hoy2 = date('dmY_His');
    $name = $tipodocumento . '_' . $documento .'_' . $hoy2 . '.' . $archivos[$i]->extension;
    list(, $archivos[$i]->base64) = explode(';', $archivos[$i]->base64); // Proceso para traer el Base64
    list(, $archivos[$i]->base64) = explode(',', $archivos[$i]->base64); // Proceso para traer el Base64
    $base64 = base64_decode($archivos[$i]->base64); // Proceso para traer el Base64
    // echo $name;
    // echo $base64;
    file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp 
    $subio = UploadFile($ruta, $name);
    if ($subio != '0 - Error') {
      array_push($rutas, (object)[
        'ruta' => $subio,
        'tipo' => $archivos[$i]->codigo,
        'codigo' => '0',
        'mensaje' => 'Archivos Cargado Correctamente'
      ]);
    } else {
      $estado = $estado + 1;
    }
  }
  if ($estado == 0) {
    echo json_encode($rutas);
  } else {
    echo '0';
  }
}
// function CargarSoportes()
// {
//   require_once('../config/dbcon.php');
//   require_once('../config/ftpcon.php');
//   require_once('../upload_file/subir_archivo.php');
//   global $request;
//   $archivos = json_decode($request->archivos);
//   $tipodocumento = $request->tipodocumento;
//   $documento = $request->numero;
//   $hoy = date('dmY');
//   $path = '/cargue_ftp/Digitalizacion/Genesis/IPS/' . $hoy . '/';
//   $estado = 0;
//   $rutas = [];
//   for ($i = 0; $i < count($archivos); $i++) {
//     $name = $tipodocumento . '_' . $documento . '_' . $archivos[$i]->codigo . '_' . $hoy;
//     $subio = subirDigitalizacionFTP($archivos[$i]->base64, $path, $name, $archivos[$i]->extension);
//     if ($subio != '0 - Error') {
//       // $rutas[$i]->ruta = $subio;
//       // $rutas[$i]->tipo = $archivos[$i]->codigo;
//       // $rutas[$i]->codigo = '0';
//       // $rutas[$i]->mensaje = 'Archivos Cargado Correctamente';
//       array_push($rutas, (object)[
// 				'ruta' => $subio,
//         'tipo' =>$archivos¨[$i]->codigo,
// 				'codigo' => '0',
//         'mensaje' => 'Archivos Cargado Correctamente'
// 			]);
//     } else {
//       $estado = $estado + 1;
//     }
//   }
//   if ($estado == 0) {
//     echo json_encode($rutas);
//   } else {
//     echo '0';
//   }
// }
function SubirArchivos()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $tipodocumento = $request->tipodocumento;
  $numero = $request->numero;
  $rutas = $request->rutas;
  $cantidad = $request->cantidad;
  $ftp = '1';
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_inserta_adjuntos_cabeza(:v_tipo_documento,:v_documento,:v_rutas,:v_cantidad,:v_ftp,:v_respuesta); end;');
  oci_bind_by_name($consulta, ':v_tipo_documento', $tipodocumento);
  oci_bind_by_name($consulta, ':v_documento', $numero);
  oci_bind_by_name($consulta, ':v_rutas', $rutas);
  oci_bind_by_name($consulta, ':v_cantidad', $cantidad);
  oci_bind_by_name($consulta, ':v_ftp', $ftp);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_respuesta', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}


function ListarAfiliacionXConfirmar()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $usuario = $request->usuario;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_listar_afiliacion_x_confirmar (:v_usuario,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_usuario', $usuario);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}



function ObtenerSoportes()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $vtipo = $request->tipo;
  $v_numero = $request->numero;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_obtener_soportes (:v_tipo,:v_documento,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_tipo', $vtipo);
  oci_bind_by_name($consulta, ':v_documento', $v_numero);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}

function AprobarAfiliacion()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $v_numero = $request->numero;
  $ubicacion = $request->ubicacionresponsable;
  $responsable = $request->responsable;
  $tipo_cabeza = $request->tipo_cab;
  $doc_cabeza = $request->doc_cabeza;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_aprobar_afiliacion (:v_numero,:v_ubicacion_gestion,:v_responsable,:v_tipo_cabeza,:v_documento_cabeza,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_numero', $v_numero);
  oci_bind_by_name($consulta, ':v_ubicacion_gestion', $ubicacion);
  oci_bind_by_name($consulta, ':v_responsable', $responsable);
  oci_bind_by_name($consulta, ':v_tipo_cabeza', $tipo_cabeza);
  oci_bind_by_name($consulta, ':v_documento_cabeza', $doc_cabeza);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}


function ReporteIncosistencia()
{
  require_once('../config/dbcon_prod.php');
  global $request;

  $tipo_documento = $request->tipo_documento;
  $documento = $request->documento;
  $json = $request->json;
  $responsable = $request->responsable;
  $fecha_nacimiento = $request->fecha_nacimiento;
  //$fecha_nacimiento = date('d/m/Y', strtotime($request->fecha_nacimiento));

  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_generar_incosistencia_nov_temp (:v_tipo_documento_consultar,:v_documento_consulta,:v_json_in,:v_responsable,:v_fecha_nacimiento,:v_json_row); end;');
  $json_parametros = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_tipo_documento_consultar', $tipo_documento);
  oci_bind_by_name($consulta, ':v_documento_consulta', $documento);
  oci_bind_by_name($consulta, ':v_json_in', $json_parametros, -1, OCI_B_CLOB);
  $json_parametros->writeTemporary($json);
  oci_bind_by_name($consulta, ':v_responsable', $responsable);
  oci_bind_by_name($consulta, ':v_fecha_nacimiento', $fecha_nacimiento);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function informacionnacimiento()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $ubicacion = $request->ubicacion;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_consolidado_nacimiento (:v_ubicacion,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}


function nacimientoXdepartamento()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $ubicacion = $request->ubicacion;
  $estado = $request->estado;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_obtener_departamentos_nacimiento (:v_ubicacion,:v_estado,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
  oci_bind_by_name($consulta, ':v_estado', $estado);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}

function nacimientoXmunicipio()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $departamento = $request->departamento;
  $estado = $request->estado;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_obtener_municipios_nacimiento (:v_departamento,:v_estado,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_departamento', $departamento);
  oci_bind_by_name($consulta, ':v_estado', $estado);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}
/*
function nacimientoXdepartamento()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $ubicacion = $request->ubicacion;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_obtener_departamentos_nacimiento (:v_ubicacion,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}

function nacimientoXmunicipio()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $departamento = $request->departamento;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_obtener_municipios_nacimiento (:v_departamento,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_departamento', $departamento);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}
*/
function detalleIPS()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $municipio = $request->municipio;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_obtener_detalle_municipio (:v_municipio,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_municipio', $municipio);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}


function detalle_funcionario()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  //$v_documento = 71989040;
  $v_documento = $request->documento;
  // $estado = $request->estado;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_informe_funcionario (:v_documento ,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_documento', $v_documento);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}

function VisualizarDetalleIPS()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $nit = $request->nit;
  $estado = $request->estado;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_obtener_detalle_ips (:v_nit,:v_estado,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_nit', $nit);
  oci_bind_by_name($consulta, ':v_estado', $estado);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}


function VisualizarDetallesFuncionario()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  //$v_documento = 71989040;
  $v_documento = $request->documento;
  $estado = $request->estado;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_obtener_detalle_funcionario (:v_documento ,:v_estado ,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_documento', $v_documento);
  oci_bind_by_name($consulta, ':v_estado', $estado);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}


function listar_observaciones_rechazo()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_obtener_listado_rechazo (:v_json_res); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}




function Rechazar()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $numero = $request->numero;
  $observacion = $request->observacion;
  $responsable = $request->responsable;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_rechazar_nacimiento (:v_numero,:v_observacion,:v_responsable,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_numero', $numero);
  oci_bind_by_name($consulta, ':v_observacion', $observacion);
  oci_bind_by_name($consulta, ':v_responsable', $responsable);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}

function ListarPorActualizar()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $ubicacion = $request->ubicacion;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_listado_pendiente (:v_ubicacion,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}

function listado_ips()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $ubicacion = $request->ubicacion;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_listado_ips (:v_ubicacion,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}

function detalle_ips()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $nit = $request->nit;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_detalle_x_ips (:v_nit,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_nit', $nit);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}

function PromedioDia()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $ubicacion = $request->ubicacion;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_informe_nacimiento_promedio(:v_ubicacion,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}

function PromedioFuncionario()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $ubicacion = $request->ubicacion;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_informe_funcionario_nacimiento(:v_ubicacion,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}


function CantidadPorMeses()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $ubicacion = $request->ubicacion;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_cantidad_x_meses_nacimiento(:v_ubicacion,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}


function IdenficarNacimiento()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $ubicacion = $request->ubicacion;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_identificar_nacimiento(:v_ubicacion,:v_json_apro,:v_json_rechazo); end;');
  oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
  $clob_aprobado = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_apro', $clob_aprobado, -1, OCI_B_CLOB);
  $clob_rechazado = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_rechazo', $clob_rechazado, -1, OCI_B_CLOB);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_execute($consulta, OCI_DEFAULT);
  $aprobado = $clob_aprobado->read($clob_aprobado->size());
  $rechazado = $clob_rechazado->read($clob_rechazado->size());
  $datos = '{"aprobado":' . $aprobado . ',"rechazado":' . $rechazado . '}';
  echo ($datos);
  oci_close($c);
}



function ReporteNacimiento()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $doc_rapido = $request->doc_rapido;
  $doc_demorado = $request->doc_demorado;
  $estado = $request->estado;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_informacion_nacimiento_reporte(:v_doc_rapido,:v_doc_demorado,:v_estado,:v_json_apro,:v_json_rechazo); end;');
  oci_bind_by_name($consulta, ':v_doc_rapido', $doc_rapido);
  oci_bind_by_name($consulta, ':v_doc_demorado', $doc_demorado);
  oci_bind_by_name($consulta, ':v_estado', $estado);
  $clob_aprobado = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_apro', $clob_aprobado, -1, OCI_B_CLOB);
  $clob_rechazado = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_rechazo', $clob_rechazado, -1, OCI_B_CLOB);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_execute($consulta, OCI_DEFAULT);
  $aprobado = $clob_aprobado->read($clob_aprobado->size());
  $rechazado = $clob_rechazado->read($clob_rechazado->size());
  $datos = '{"rapida":' . $aprobado . ',"demorada":' . $rechazado . '}';
  echo ($datos);
  oci_close($c);
}

// CNVU
function ConsultarInfoNacimiento()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $vtipo = $request->v_ptipodocumento;
  $v_numero = $request->v_pdocumento;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_obtener_informacion_nacimiento (:v_tipo,:v_documento,:v_json_res); end;');
  oci_bind_by_name($consulta, ':v_tipo', $vtipo);
  oci_bind_by_name($consulta, ':v_documento', $v_numero);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}

function verSoporte()
{
  global $request;
  $fileexists = false;

  if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE && $fileexists == false) {
    require_once('../../config/ftpcon.php');
    $fileexists = true;
  }

  if ($fileexists) {
    $name = uniqid();
    $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
    $name = $name . '.' . $ext;
    $local_file = '../../temp/' . $name;
    $handle = fopen($local_file, 'w');
    if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
      echo $name;
    } else {
      echo "Error";
    }
    ftp_close($con_id);
    fclose($handle);
  } else {
    require('../sftp_cloud/DownloadFile.php');
    echo (DownloadFile($request->ruta));
  }
}
//


function CantidadRechazados()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_cantidad_rechazado (:v_json_res); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}

function IPSRechazo()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_listado_ips_rechazo (:v_json_res); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}


function FuncionarioRechazo()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $consulta = oci_parse($c, 'begin pq_genesis_3047.p_listado_funcionario_rechazo (:v_json_res); end;');
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_res', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  echo $json;
  oci_close($c);
}
