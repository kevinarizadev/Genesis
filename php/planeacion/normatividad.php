<?php
	$postdata = file_get_contents("php://input");
  	$request = json_decode($postdata);
	$function = $request->function;
    $function();
    function colocar_ano(){
        require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_normatividad.p_lista_anno(:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);
    }
    function colocar_entidad(){
        require_once('../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'begin pq_genesis_normatividad.P_LISTA_ENTIDAD(:v_json_row); end;');
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
        oci_close($c);
    }
    function obtener_listados(){
        require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_normatividad.p_lista_normatividad(:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);
    }
    function colocar_tipo(){
        require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'begin pq_genesis_normatividad.p_lista_tipo_norma(:v_json_row); end;');
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
        oci_close($c);
    }

    //CARGAR ARCHIVO A FTP
  //   function subir_adjunto(){
  //    require_once('../config/dbcon.php');
  //    require_once('../config/ftpcon.php');
  //    include('../movilidad/subir_archivo.php');
  //    global $request;
  //    // otras variables
  //      $tipodoc = $request->tipo;
  //    $hoy = date('dmY');
  //      $hora = uniqid();
  //    $path = '/cargue_ftp/Digitalizacion/Normatividad/'.$hoy.'/';
  //    $estado = 0;
  //         $tipodoc = $request->tipo;
  //         $name = $tipodoc."_".$hora;
  //         $subio = subirFTP($request->achivobase,$path,$name,$request->ext);
  //         $rutas= $subio;

  //         echo $rutas;
  // }

  //CARGAR ARCHIVOS FTP NUBE
  function subir_adjunto(){
    require_once('../config/dbcon.php');
    require_once('../config/ftpcon.php');
    include('../movilidad/subir_archivo.php');
    global $request;
    $hoy = date('dmY_His');
    $path = 'Planeacion/Normatividad/'.$hoy;
    $name = $request->tipo.'_'.$hoy.'.'.$request->ext;
    $archivos = $request->achivobase;
    list(, $archivos) = explode(';', $archivos); // Proceso para traer el Base64
    list(, $archivos) = explode(',', $archivos);  // Proceso para traer el Base64
    $base64 = base64_decode($archivos); // Proceso para traer el Base64
    file_put_contents('../../temp/' . $name, $base64);
    require('../sftp_cloud/UploadFile.php');
    $subio = UploadFile($path, $name);

    explode('-', $subio);
    if ($subio[0] != '0') {
      echo $subio;
    } else {
      echo '0';
    }
 }

 //DESCARGAR ADJUNTOS FTP
  function descargaAdjunto()
  {
    global $request;
    $fileexists = false;

    if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/' . $request->ruta) == TRUE) {
      require_once('../config/ftpcon.php');
      $fileexists = true;
    }
    if (file_exists('ftp://genesis_ftp:Cajacopi2022!@192.168.50.36/' . $request->ruta) == TRUE) {
      require_once('../config/sftp_con.php');
      $fileexists = true;
    }

    if($fileexists) {
      $file_size = ftp_size($con_id, $request->ruta);
      if ($file_size != -1) {
        // $ruta = $request->ruta;
        $name = explode("/", $request->ruta)[count(explode("/", $request->ruta))-1];//Encontrar el nombre y la posicion de la ultima carpeta que contenga / en la ruta
        // $ext = pathinfo($request->ruta, PATHINFO_EXTENSION);
        // $name = $name;
        $local_file = '../../temp/' . $name;
        $handle = fopen($local_file, 'w');
        if (ftp_fget($con_id, $handle, $request->ruta, FTP_ASCII, 0)) {
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
      echo( DownloadFile($request->ruta) );
    }
  }


  function publicar(){
    require_once('../config/dbcon_prod.php');
    global $request;
    $numero=$request->numero;
    $accion=$request->accion;
    $consulta = oci_parse($c,'begin pq_genesis_normatividad.p_ui_normatividad( :v_pnumero,
                                                                                :v_pcodigo_norma,
                                                                                :v_pfecha_anno,
                                                                                :v_padjunto,
                                                                                :v_ptitulo,
                                                                                :v_pdescripcion,
                                                                                :v_paccion,
                                                                                :v_estadog,
                                                                                :v_pentidad,
                                                                                :v_json_row); end;');
   oci_bind_by_name($consulta,':v_pnumero',$numero);
   oci_bind_by_name($consulta,':v_pcodigo_norma',$request->tipo);
   oci_bind_by_name($consulta,':v_pfecha_anno',$request->anio);
   oci_bind_by_name($consulta,':v_padjunto',$request->ruta);
   oci_bind_by_name($consulta,':v_ptitulo',$request->titulo);
   oci_bind_by_name($consulta,':v_pdescripcion',$request->descripcion);
   oci_bind_by_name($consulta,':v_paccion',$accion);
   oci_bind_by_name($consulta,':v_estadog',$request->estado);
   oci_bind_by_name($consulta,':v_pentidad',$request->entidad);
    $clob = oci_new_descriptor($c,OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
    oci_execute($consulta,OCI_DEFAULT);
    $json = $clob->read($clob->size());
    echo $json;
    oci_close($c);
  }
?>
