<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
//$function();

function descargaAdjunto()
{
  global $request;
  $fileexists = false;
  $requestruta = $request->ruta;
  if(substr($requestruta, 0, 36)  == '/cargue_ftp/Digitalizacion/Genesis//') {
    $requestruta = substr($request->ruta, 35, strlen($request->ruta)-1);
  }

  if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $requestruta) == TRUE) {
      require_once('../config/ftpcon.php'); $fileexists = true;
    }
  if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $requestruta) == TRUE) {
    require_once('../config/sftp_con.php'); $fileexists = true;
  }
  if (file_exists('ftp://ftp:Cajacopi2022.@192.168.50.36/' . $requestruta) == TRUE) {
    require_once('../config/sftp_con_2.php'); $fileexists = true;
  }
  if (file_exists('ftp://l_ftp_genesis:Troja2020!@192.168.50.10/' . $requestruta) == TRUE) {
    require_once('../config/l_ftpcon.php'); $fileexists = true;
  }

  if($fileexists) {
    $file_size = ftp_size($con_id, $requestruta);
    if ($file_size != -1) {
      $ruta = $requestruta;
      $name = explode("/", $ruta)[count(explode("/", $ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
      $ext = pathinfo($requestruta, PATHINFO_EXTENSION);
      $name = $name . '.' . $ext;
      $local_file = '../../temp/' . $name;
      $handle = fopen($local_file, 'w');
      if (ftp_fget($con_id, $handle, $requestruta, FTP_ASCII, 0)) {
        echo $name;
      } else {
        echo "0 - Error Al descargar el archivo";
      }
      ftp_close($con_id);
      fclose($handle);
    } else {
      echo "0 - Error Archivo no existe";
    }
  } else {
    require('../sftp_cloud/DownloadFile.php');
    echo( DownloadFile($requestruta) );
  }
}


function obtenercodigo()
{
  echo $_SESSION["codmunicipio"];
}

function obtenerdptos()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $cod = $request->cod;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_MESA_CONTROL_ASEG.P_SECCIONALES(:vp_cod,:v_json_row); end;');
  oci_bind_by_name($consulta, ':vp_cod', $cod);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
function obtenermunis()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $dpto = $request->dpto;
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_MESA_CONTROL_ASEG.P_MUNIS(:vp_dpto,:v_json_row); end;');
  oci_bind_by_name($consulta, ':vp_dpto', $dpto);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
//////////////////////OBTENER USUARIOS/////////////////////////////
function obtenerusuarios()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $cedula = $_SESSION["cedula"];
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_MESA_CONTROL_ASEG.OBTENER_USUARIO(:vp_cedula,:v_json_row); end;');
  oci_bind_by_name($consulta, ':vp_cedula', $cedula);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
//////////////////////OBTENER USUARIO REPORTE/////////////////////////////
function obtenerreporte()
{
  require_once('../config/dbcon_prod.php');
  global $request;
  $cedula = $_SESSION["cedula"];
  $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_MESA_CONTROL_ASEG.p_valida_funcionario(:v_documento,:v_response); end;');
  oci_bind_by_name($consulta, ':v_documento', $cedula);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_response', $clob, -1, OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  if (isset($clob)) {
    $json = $clob->read($clob->size());
    echo $json;
  } else {
    echo 0;
  }
  oci_close($c);
}
//////////////////////////OBTENER///////////////////////
function obtenersdocs()
{
  require_once('../config/dbconsqlserver_softars.php');
  global $request;
  $myparams['cod_area'] = $request->codigo;
  $myparams['json_row'] = "";
  $procedure_params = array(
    array(&$myparams['cod_area'], SQLSRV_PARAM_IN),
    array(&$myparams['json_row'], SQLSRV_PARAM_OUT)
  );
  $consulta = "EXEC dbo.Sp_obtener_tipo_documentos @cod_area=?,@json_row =?";
  $stmt = sqlsrv_prepare($conn, $consulta, $procedure_params);
  if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
  }
  if (sqlsrv_execute($stmt)) {
    while ($res = sqlsrv_next_result($stmt)) { }
    print_r($myparams['json_row']);
  } else {
    die(print_r(sqlsrv_errors(), true));
  }
  sqlsrv_close($conn);
}

function insertsdocs()
{
  require_once('../config/dbconsqlserver_softars.php');
  global $request;
  $myparams['nombre'] = $request->nombre;
  $myparams['dialimite'] = $request->dialimite;
  $myparams['periodo'] = $request->periodo;
  $myparams['cod_area'] = $request->cod_area;
  $myparams['obligatorio'] = $request->obligatorio;
  $myparams['json_row'] = '';
  $procedure_params = array(
    array(&$myparams['nombre'], SQLSRV_PARAM_IN),
    array(&$myparams['dialimite'], SQLSRV_PARAM_IN),
    array(&$myparams['periodo'], SQLSRV_PARAM_IN),
    array(&$myparams['cod_area'], SQLSRV_PARAM_IN),
    array(&$myparams['obligatorio'], SQLSRV_PARAM_IN),
    array(&$myparams['json_row'], SQLSRV_PARAM_OUT)
  );
  $sql = "EXEC Sp_insertar_tipo_documentos  @nombre = ?,
  @dialimite  = ?,
  @periodo  =?,
  @cod_area = ?,
  @obligatorio = ?,
  @json_row =?";
  $stmt = sqlsrv_prepare($conn, $sql, $procedure_params);
  if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
  }
  if (sqlsrv_execute($stmt)) {
    while ($res = sqlsrv_next_result($stmt)) { }
    print_r($myparams['json_row']);
  } else {
    die(print_r(sqlsrv_errors(), true));
  }
  sqlsrv_close($conn);
}


function recorddocs()
{
  require_once('../config/dbconsqlserver_softars.php');
  global $request;
  $myparams['tipodocumento'] = $request->tipodocumento;
  $myparams['periodo'] = $request->periodo;
  $myparams['tiempoentrega'] = $request->tiempoentrega;
  $myparams['usuario'] = $_SESSION["usu"];
  $myparams['fecha_carga'] = $request->fecha_carga;
  $myparams['json_row'] = '';
  $procedure_params = array(
    array(&$myparams['tipodocumento'], SQLSRV_PARAM_IN),
    array(&$myparams['periodo'], SQLSRV_PARAM_IN),
    array(&$myparams['tiempoentrega'], SQLSRV_PARAM_IN),
    array(&$myparams['usuario'], SQLSRV_PARAM_IN),
    array(&$myparams['fecha_carga'], SQLSRV_PARAM_IN),
    array(&$myparams['json_row'], SQLSRV_PARAM_OUT)
  );
  $sql = "EXEC Sp_generar_tipo_documentos  @tipodocumento = ?,
  @periodo  = ?,
  @tiempoentrega  =?,
  @usuario = ?,
  @fecha_carga = ?,
  @json_row =?";
  $stmt = sqlsrv_prepare($conn, $sql, $procedure_params);
  if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
  }
  if (sqlsrv_execute($stmt)) {
    while ($res = sqlsrv_next_result($stmt)) { }
    print_r($myparams['json_row']);
  } else {
    die(print_r(sqlsrv_errors(), true));
  }
  sqlsrv_close($conn);
}
function searchdocs()
{
  require_once('../config/dbconsqlserver_softars.php');
  global $request;
  $cod_area = $request->cod_area;
  $cod_ubicacion = $request->cod_ubicacion;
  $nombre = $request->nombre;
  $periodo = $request->periodo;
  $consulta = "select 
  REPLACE (CONCAT (H.CODCTROCOSTOS, H.COD_DOCENTREGA,H.PER_REPORTE),'/','') ID,
  H.CODCTROCOSTOS CODIGO_DANE,
  F.DES_DOCENTREGA NOMBRE_DOCUMENTO,
  H.PER_REPORTE PERIODO_REPORTE,
  convert(varchar, H.FEC_DOCENTREGA, 103) FECHA_ENTREGA,
  H.COD_DOCENTREGA CODIGO_TIPO_DOC,
  CASE WHEN H.ING_DOCENTREGA = '' THEN 'SIN SOPORTE' ELSE  'CON SOPORTE' END ESTADO_IMAGEN,
  H.ING_DOCENTREGA URL,
  H.CONF_ORIGINAL CODIGO_REF,
  --ISNULL(T.NOM_PRESTADOR,'NO APLICA') PRESTADOR,
  --ISNULL((SELECT TOP(1) NOM_PRESTADOR PRESTADOR FROM CAPITACIONMES
  --WHERE LTRIM(NIT_PRESTADOR)=LTRIM(H.CONF_ORIGINAL)
  --COLLATE SQL_Latin1_General_CP850_CI_AS
  --),'NO APLICA') PRESTADOR,
  CASE WHEN OBS_DOCENTREGA='' THEN 'NO APLICA' ELSE OBS_DOCENTREGA END PRESTADOR,
  H.CODCTROPRESTADOR CODIGO,
  CASE  WHEN CHARINDEX('_',H.CODCTROPRESTADOR) > 0 THEN SUBSTRING(H.CODCTROPRESTADOR,CHARINDEX('_',H.CODCTROPRESTADOR)+1,LEN(H.CODCTROPRESTADOR)-CHARINDEX('_',H.CODCTROPRESTADOR))
  ELSE H.CODCTROPRESTADOR END CONTRATO,
  ISNULL(F.OBL_SOPORTE,'N') OBLIGATORIO,
  H.COD_USUARIO_RUTA USUARIO,
  F.DIALIMITE DIA_LIMITE,
  CASE WHEN F.PER_ENTREGA = 'M' THEN 'MENSUAL' ELSE  'SEMANAL' END  PERIODICIDAD,
  CASE WHEN H.ESTADO = 'R' THEN 'REVISION'
  WHEN H.ESTADO = 'A' THEN 'APROBADO'
  WHEN H.ESTADO = 'C' THEN 'RECHAZADO'
  WHEN H.ING_DOCENTREGA = '' THEN 'EN ESPERA'
  ELSE
  'APROBADO' END  ESTADO,
  H.OBSERVACIONESTADO OBSERVACION,
  convert(varchar, H.FEC_RADICADO, 103) FECHA_RAD,
  H.NUM_AFILIADO,
  H.OBSERVACION OBSERVACIONDOC

  from CONTDOCENTREGAENTES H
  inner join TIP_DOCENTREGA F ON F.COD_DOCENTREGA = H.COD_DOCENTREGA  AND F.ID_AREA = ?
  --left join CAPITACIONMES  T ON T.NIT_PRESTADOR = H.CONF_ORIGINAL
  --COLLATE SQL_Latin1_General_CP850_CI_AS
  where H.CODCTROCOSTOS = ? and
  F.DES_DOCENTREGA like CONCAT('%',?,'%') and
  H.PER_REPORTE like CONCAT('%',?,'%')
  GROUP BY 
--ID,
  H.COD_DOCENTREGA,
  H.CODCTROCOSTOS,
  F.DES_DOCENTREGA,
  H.PER_REPORTE,
  H.FEC_DOCENTREGA,

  H.ING_DOCENTREGA,
  H.ING_DOCENTREGA,
  H.CONF_ORIGINAL,
  --T.NOM_PRESTADOR,
  OBS_DOCENTREGA,
  H.CODCTROPRESTADOR,
  F.DIALIMITE,

  F.PER_ENTREGA,
  H.ESTADO,
  F.OBL_SOPORTE,
  H.COD_USUARIO_RUTA,
  H.OBSERVACIONESTADO,
  H.FEC_RADICADO,
  H.NUM_AFILIADO,
  H.OBSERVACION
  ORDER BY H.FEC_DOCENTREGA DESC;
  --ORDER BY ID DESC";
  $stmt = sqlsrv_query($conn, $consulta, array($cod_area, $cod_ubicacion, $nombre, $periodo));
  $row = array();
  $rows = array();
  if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
  }
  while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt($stmt);
  sqlsrv_close($conn);
}

// function searchdocs (){
//   require_once('../config/dbconsqlserver_softars.php');
//   global $request;
//   $cod_area = $request->cod_area  ;
//   $cod_ubicacion = $request->cod_ubicacion  ; 
//   $nombre = $request->nombre  ; 
//   $periodo = $request->periodo; 
//   $consulta = "select 
//   REPLACE (CONCAT (H.CODCTROCOSTOS, H.COD_DOCENTREGA,H.PER_REPORTE),'/','') ID,
//   H.CODCTROCOSTOS CODIGO_DANE,
//   F.DES_DOCENTREGA NOMBRE_DOCUMENTO,
//   H.PER_REPORTE PERIODO_REPORTE,
//   convert(varchar, H.FEC_DOCENTREGA, 103) FECHA_ENTREGA,
//   H.COD_DOCENTREGA CODIGO_TIPO_DOC,
//   CASE WHEN H.ING_DOCENTREGA = '' THEN 'SIN SOPORTE' ELSE  'CON SOPORTE' END ESTADO_IMAGEN,
//   H.ING_DOCENTREGA URL,
//   H.CONF_ORIGINAL CODIGO_REF,
//   ISNULL(T.NOM_PRESTADOR,'NO APLICA') PRESTADOR,
//   H.CODCTROPRESTADOR CODIGO,
//   CASE  WHEN CHARINDEX('_',H.CODCTROPRESTADOR) > 0 THEN SUBSTRING(H.CODCTROPRESTADOR,CHARINDEX('_',H.CODCTROPRESTADOR)+1,LEN(H.CODCTROPRESTADOR)-CHARINDEX('_',H.CODCTROPRESTADOR))
//   ELSE H.CODCTROPRESTADOR END CONTRATO,
//   ISNULL(F.OBL_SOPORTE,'N') OBLIGATORIO,
//   H.COD_USUARIO_RUTA USUARIO,
//   F.DIALIMITE DIA_LIMITE,
//   CASE WHEN F.PER_ENTREGA = 'M' THEN 'MENSUAL' ELSE  'SEMANAL' END  PERIODICIDAD,   
//   CASE WHEN H.ESTADO = 'R' THEN 'REVISION'
//   WHEN H.ESTADO = 'A' THEN 'APROBADO'
//   WHEN H.ESTADO = 'C' THEN 'RECHAZADO'
//   WHEN H.ING_DOCENTREGA = '' THEN 'EN ESPERA'
//   ELSE
//   'APROBADO' END  ESTADO,
//   H.OBSERVACIONESTADO OBSERVACION
//   from CONTDOCENTREGAENTES H
//   inner join TIP_DOCENTREGA F ON F.COD_DOCENTREGA = H.COD_DOCENTREGA  AND F.ID_AREA = ?
//   left join CAPITACIONMES  T ON T.NIT_PRESTADOR = H.CONF_ORIGINAL
//   COLLATE SQL_Latin1_General_CP850_CI_AS
//   where H.CODCTROCOSTOS = ? and
//   F.DES_DOCENTREGA like CONCAT('%',?,'%') and
//   H.PER_REPORTE like CONCAT('%',?,'%')
//   GROUP BY H.COD_DOCENTREGA,H.CODCTROCOSTOS,F.DES_DOCENTREGA,H.PER_REPORTE, H.FEC_DOCENTREGA,
//                       H.ING_DOCENTREGA,H.ING_DOCENTREGA,H.CONF_ORIGINAL,T.NOM_PRESTADOR,
//                       H.CODCTROPRESTADOR,F.DIALIMITE,F.PER_ENTREGA,H.ESTADO,F.OBL_SOPORTE, H.COD_USUARIO_RUTA, H.OBSERVACIONESTADO
//               ORDER BY H.FEC_DOCENTREGA DESC"; 
//   $stmt=sqlsrv_query($conn,$consulta,array($cod_area,$cod_ubicacion,$nombre,$periodo)); 
//   $row = array(); 
//   $rows= array(); 
//   if( $stmt === false) { 
//   die( print_r( sqlsrv_errors(), true) ); 
//   } 
//   while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
//   { 
//   $rows[] = $row; 
//   } 
//   echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE); 
//   sqlsrv_free_stmt( $stmt); 
//   sqlsrv_close( $conn ); 
// }

function updatedoc()
{
  require_once('../config/dbconsqlserver_softars.php');
  global $request;
  // echo $request->observacion;
  $myparams['ubicacion'] = $request->ubicacion;
  $myparams['tipodocumento'] = $request->tipodocumento;
  $myparams['periodo'] = $request->periodo;
  $myparams['ruta'] = $request->ruta;
  $myparams['codigo'] = $request->codigo;
  // $myparams['fecha'] = $request->fecha;
  $myparams['observacion_estado'] = $request->observacion;
  $myparams['estado'] = $request->estado;
  $myparams['usuario'] = $_SESSION["usu"];
  $myparams['fecha_rad'] = $request->fecha_rad;
  $myparams['num_afili'] = $request->num_afi;
  $myparams['observacion'] = $request->obs_doc;
  $myparams['json_row'] = '';
  $procedure_params = array(
    array(&$myparams['ubicacion'], SQLSRV_PARAM_IN),
    array(&$myparams['tipodocumento'], SQLSRV_PARAM_IN),
    array(&$myparams['periodo'], SQLSRV_PARAM_IN),
    array(&$myparams['ruta'], SQLSRV_PARAM_IN),
    array(&$myparams['codigo'], SQLSRV_PARAM_IN),
    array(&$myparams['observacion_estado'], SQLSRV_PARAM_IN),
    array(&$myparams['estado'], SQLSRV_PARAM_IN),
    array(&$myparams['usuario'], SQLSRV_PARAM_IN),
    array(&$myparams['fecha_rad'], SQLSRV_PARAM_IN),
    array(&$myparams['num_afili'], SQLSRV_PARAM_IN),
    array(&$myparams['observacion'], SQLSRV_PARAM_IN),
    array(&$myparams['json_row'], SQLSRV_PARAM_OUT)
  );
  $sql = "EXEC Sp_actualizar_adjuntos  @ubicacion  =?,
  @tipodocumento  =?,
  @periodo  =?,
  @ruta = ?,
  @codigo = ?,
  @observacion_estado = ?,
  @estado = ?,
  @usuario = ?,
  @fecha_rad = ?,
  @num_afili = ?,
  @observacion = ?,
  @json_row =?";
  $stmt = sqlsrv_prepare($conn, $sql, $procedure_params);
  if (!$stmt) {
    die(print_r(sqlsrv_errors(), true));
  }
  if (sqlsrv_execute($stmt)) {
    while ($res = sqlsrv_next_result($stmt)) { }
    print_r($myparams['json_row']);
  } else {
    die(print_r(sqlsrv_errors(), true));
  }
  sqlsrv_close($conn);
}

function subir()
{
  global $request;
  // variables de parametros

  $archivos =  $request->BaseArchivo;
  $hoy = date('dmY');
  $path = $request->path . $hoy;
  $name = $request->nomadj . '.' . $request->ext;
  list(, $archivos) = explode(';', $archivos); // Proceso para traer el Base64
  list(, $archivos) = explode(',', $archivos);  // Proceso para traer el Base64
  $base64 = base64_decode($archivos); // Proceso para traer el Base64
  file_put_contents('../../temp/' . $name, $base64); // El Base64 lo guardamos como archivo en la carpeta temp
  require('../sftp_cloud/UploadFile.php');
  $subio = UploadFile($path, $name);
  explode('-',$subio);
  if ($subio[0] != '0') {
    echo $subio;
  }
}


// function reportmundocs (){
//   require_once('../config/dbconsqlserver_softars.php');
//   global $request;
//   $cod_area = $request->cod_area;
//   $cod_ubicacion = $request->cod_ubicacion;
//   $periodo_ini = $request->periodo_ini;
//   $periodo_fin = $request->periodo_fin;
//   $nombre = $request->nombre;
//   $periodo = $request->periodo;
//   $consulta = "select 
//   REPLACE (CONCAT (H.CODCTROCOSTOS, H.COD_DOCENTREGA,H.PER_REPORTE),'/','') ID,
//   H.CODCTROCOSTOS CODIGO_DANE, 
//   D.NOM_DEPARTAMENTO DPTO,
//   G.NOM_CIUDAD MUNICIPIO,
//   F.DES_DOCENTREGA NOMBRE_DOCUMENTO,
//   H.PER_REPORTE PERIODO_REPORTE,
//   convert(varchar, H.FEC_DOCENTREGA, 103) FECHA_ENTREGA,
//   H.COD_DOCENTREGA CODIGO_TIPO_DOC,
//   CASE WHEN H.ING_DOCENTREGA = '' THEN 'SIN SOPORTE' ELSE  'CON SOPORTE' END ESTADO_IMAGEN,
//   H.ING_DOCENTREGA URL,
//   H.CONF_ORIGINAL CODIGO_REF,
//   ISNULL(T.NOM_PRESTADOR,'NO APLICA') PRESTADOR,
//   H.CODCTROPRESTADOR CODIGO,
//   CASE  WHEN CHARINDEX('_',H.CODCTROPRESTADOR) > 0 THEN SUBSTRING(H.CODCTROPRESTADOR,CHARINDEX('_',H.CODCTROPRESTADOR)+1,LEN(H.CODCTROPRESTADOR)-CHARINDEX('_',H.CODCTROPRESTADOR))
//   ELSE H.CODCTROPRESTADOR END CONTRATO,
//   ISNULL(F.OBL_SOPORTE,'N') OBLIGATORIO,
//   H.COD_USUARIO_RUTA USUARIO,
//   F.DIALIMITE DIA_LIMITE,
//   CASE WHEN F.PER_ENTREGA = 'M' THEN 'MENSUAL' ELSE  'SEMANAL' END  PERIODICIDAD,   
//   CASE WHEN H.ESTADO = 'R' THEN 'REVISION'
//   WHEN H.ESTADO = 'A' THEN 'APROBADO'
//   WHEN H.ESTADO = 'C' THEN 'RECHAZADO'
//   WHEN H.ING_DOCENTREGA = '' THEN 'EN ESPERA'
//   ELSE
//   'APROBADO' END  ESTADO
//   from CONTDOCENTREGAENTES H
//   inner join TIP_DOCENTREGA F ON F.COD_DOCENTREGA = H.COD_DOCENTREGA  AND F.ID_AREA = ?
//   left join CAPITACIONMES  T ON T.NIT_PRESTADOR = H.CONF_ORIGINAL
//   COLLATE SQL_Latin1_General_CP850_CI_AS
//   inner join CIUDADES g ON CONCAT(G.COD_DEPARTAMENTO,COD_CIUDAD) = H.CODCTROCOSTOS COLLATE SQL_Latin1_General_CP850_CI_AS
//   inner join DEPARTAMENTOS D ON D.COD_DEPARTAMENTO = G.COD_DEPARTAMENTO
//   where H.CODCTROCOSTOS like CONCAT(?,'%') and
//   --H.FEC_DOCENTREGA >= ? and  H.FEC_DOCENTREGA <= ? and
//   CONVERT(DATETIME,CONCAT(SUBSTRING(H.PER_REPORTE, 1, 2),'/01/',SUBSTRING(H.PER_REPORTE, 4, 7))) >= ?
//   AND
//   CONVERT(DATETIME,CONCAT(SUBSTRING(H.PER_REPORTE, 1, 2),'/01/',SUBSTRING(H.PER_REPORTE, 4, 7))) <= ? AND
//   F.DES_DOCENTREGA like CONCAT('%',?,'%') and
//   H.PER_REPORTE like CONCAT('%',?,'%')
//   GROUP BY H.COD_DOCENTREGA,H.CODCTROCOSTOS,D.NOM_DEPARTAMENTO, G.NOM_CIUDAD,F.DES_DOCENTREGA,H.PER_REPORTE, H.FEC_DOCENTREGA,
//                       H.ING_DOCENTREGA,H.ING_DOCENTREGA,H.CONF_ORIGINAL,T.NOM_PRESTADOR,
//                       H.CODCTROPRESTADOR,F.DIALIMITE,F.PER_ENTREGA,F.OBL_SOPORTE, H.COD_USUARIO_RUTA,H.ESTADO
//               ORDER BY H.FEC_DOCENTREGA DESC"; 
//   $stmt=sqlsrv_query($conn,$consulta,array($cod_area,$cod_ubicacion,$periodo_ini,$periodo_fin,$nombre,$periodo)); 
//   $row = array(); 
//   $rows= array(); 
//   if( $stmt === false) { 
//   die( print_r( sqlsrv_errors(), true) ); 
//   } 
//   while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)) 
//   { 
//   $rows[] = $row; 
//   } 
//   echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE); 
//   sqlsrv_free_stmt( $stmt); 
//   sqlsrv_close( $conn ); 
//   }


function reportmundocs()
{
  require_once('../config/dbconsqlserver_softars.php');
  global $request;
  $cod_area = $request->cod_area;
  $cod_ubicacion = $request->cod_ubicacion;
  $periodo_ini = $request->periodo_ini;
  $periodo_fin = $request->periodo_fin;
  $nombre = $request->nombre;
  $periodo = $request->periodo;
  $consulta = "select
  H.CODCTROCOSTOS CODIGO_DANE, 
    D.NOM_DEPARTAMENTO DPTO,
    G.NOM_CIUDAD MUNICIPIO,
    F.DES_DOCENTREGA NOMBRE_DOCUMENTO,
    H.PER_REPORTE PERIODO_REPORTE,
    convert(varchar, H.FEC_DOCENTREGA, 103) FECHA_ENTREGA,
    H.COD_DOCENTREGA CODIGO_TIPO_DOC,
    CASE WHEN H.ING_DOCENTREGA = '' THEN 'SIN SOPORTE' ELSE  'CON SOPORTE' END ESTADO_IMAGEN,
    RTRIM(H.CONF_ORIGINAL) CODIGO_REF,
    --ISNULL(T.NOM_PRESTADOR,'NO APLICA') PRESTADOR,
    ISNULL((SELECT TOP(1) NOM_PRESTADOR PRESTADOR FROM CAPITACIONMES
    WHERE NIT_PRESTADOR=H.CONF_ORIGINAL
    COLLATE SQL_Latin1_General_CP850_CI_AS
    ),'NO APLICA') PRESTADOR,
    CASE  WHEN CHARINDEX('_',H.CODCTROPRESTADOR) > 0 THEN SUBSTRING(H.CODCTROPRESTADOR,CHARINDEX('_',H.CODCTROPRESTADOR)+1,LEN(H.CODCTROPRESTADOR)-CHARINDEX('_',H.CODCTROPRESTADOR))
    ELSE H.CODCTROPRESTADOR END CONTRATO,
    ISNULL(F.OBL_SOPORTE,'N') OBLIGATORIO,
    H.COD_USUARIO_RUTA USUARIO,
    CASE WHEN F.PER_ENTREGA = 'M' THEN 'MENSUAL' ELSE  'SEMANAL' END  PERIODICIDAD,   
    CASE WHEN H.ESTADO = 'R' THEN 'REVISION'
    WHEN H.ESTADO = 'A' THEN 'APROBADO'
    WHEN H.ESTADO = 'C' THEN 'RECHAZADO'
    WHEN H.ING_DOCENTREGA = '' THEN 'EN ESPERA'
    ELSE
    'APROBADO' END  ESTADO
    from CONTDOCENTREGAENTES H
    inner join TIP_DOCENTREGA F ON F.COD_DOCENTREGA = H.COD_DOCENTREGA  AND F.ID_AREA = ?
    --left join CAPITACIONMES  T ON T.NIT_PRESTADOR = H.CONF_ORIGINAL
    COLLATE SQL_Latin1_General_CP850_CI_AS
    inner join CIUDADES g ON CONCAT(G.COD_DEPARTAMENTO,COD_CIUDAD) = H.CODCTROCOSTOS COLLATE SQL_Latin1_General_CP850_CI_AS
    inner join DEPARTAMENTOS D ON D.COD_DEPARTAMENTO = G.COD_DEPARTAMENTO
    where H.CODCTROCOSTOS like CONCAT(?,'%') and
    --H.FEC_DOCENTREGA >= ? and  H.FEC_DOCENTREGA <= ? and
    CONVERT(DATETIME,CONCAT(SUBSTRING(H.PER_REPORTE, 1, 2),'/01/',SUBSTRING(H.PER_REPORTE, 4, 7))) >= ?
    AND
    CONVERT(DATETIME,CONCAT(SUBSTRING(H.PER_REPORTE, 1, 2),'/01/',SUBSTRING(H.PER_REPORTE, 4, 7))) <= ? AND
    F.DES_DOCENTREGA like CONCAT('%',?,'%') and
    H.PER_REPORTE like CONCAT('%',?,'%')
    GROUP BY H.CODCTROCOSTOS,D.NOM_DEPARTAMENTO, G.NOM_CIUDAD,F.DES_DOCENTREGA,H.PER_REPORTE, H.FEC_DOCENTREGA,            
              H.COD_DOCENTREGA, H.ING_DOCENTREGA, H.CONF_ORIGINAL, 
              --T.NOM_PRESTADOR,
              H.CODCTROPRESTADOR,
              F.PER_ENTREGA, F.OBL_SOPORTE, H.COD_USUARIO_RUTA, H.ESTADO
              ORDER BY H.FEC_DOCENTREGA DESC";
  $stmt = sqlsrv_query($conn, $consulta, array($cod_area, $cod_ubicacion, $periodo_ini, $periodo_fin, $nombre, $periodo));
  $row = array();
  $rows = array();
  if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
  }
  while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $rows[] = $row;
  }
  echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt($stmt);
  sqlsrv_close($conn);
}
