<?php
	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
	$function = $request->function;
	$function();
  function obtenerSeccionales(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_LISTA_SECCIONAL(:v_json_row); end;');
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
  function obtenerIps(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_LISTA_IPS( :v_pnit,
                                                                            :v_json_row); end;');
    oci_bind_by_name($consulta,':v_pnit', $request->codigo);                                                                        $clob = oci_new_descriptor($c,OCI_D_LOB);
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
  function obtenerRegimen(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $prestador = $request->ips;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_LISTA_REGIMEN(    :v_pnit,
                                                                                    :v_json_row
                                                                                ); end;');
    oci_bind_by_name($consulta,':v_pnit',$prestador);
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
  function obtenerlistaRegimen(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_OBTENER_REGIMEN(:v_json_row
                                                                                ); end;');
 
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
  function obtenerContrato(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $prestador = $request->ips;
    $regimen = $request->regimen;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_LISTA_CONTRATO(   :v_pnit,
                                                                                    :v_pregimen,
                                                                                    :v_json_row
                                                                                ); end;');
    oci_bind_by_name($consulta,':v_pnit',$prestador);
    oci_bind_by_name($consulta,':v_pregimen',$regimen);
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
  function obtenerProducto(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $codigo = $request->codigo;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_LISTA_PRODUCTO(    :v_pcodigo,
                                                                                    :v_json_row
                                                                                ); end;');
    oci_bind_by_name($consulta,':v_pcodigo',$codigo);
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
  function obtenerClasificacion(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $codigo = $request->codigo;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_LISTA_CLASIFICACION(      :v_pcodigo,
                                                                                            :v_json_row
                                                                                             ); end;');
    oci_bind_by_name($consulta,':v_pcodigo',$codigo);
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
  function subir_adjunto(){
    require_once('../../config/dbcon.php');
    require_once('../../config/ftpcon.php');
    include('../../movilidad/subir_archivo.php');
    global $request;
    // otras variables
      
    $hoy = date('dmY');
    $hora = uniqid();
    $path = '/cargue_ftp/Digitalizacion/Genesis/Autorizaciones/contratos/'.$hoy.'/';
    $estado = 0;   
         $tipodoc = 'solicitud';
         $name = $tipodoc."_".$hora;
         $subio = subirFTP($request->achivobase,$path,$name,$request->ext);
         $rutas= $subio;
         
         echo $rutas;
   }
   
   function enviarDatos(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $vacio=0;
    $accion='I';
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_INSERTA_SOLICITUD(      :v_pnumero,
                                                                                            :v_pseccional,
                                                                                            :v_pnit,
                                                                                            :v_pregimen,
                                                                                            :v_pcontrato,
                                                                                            :v_pproducto,
                                                                                            :v_pclasificacion,
                                                                                            :v_pobservacion,
                                                                                            :v_plink,
                                                                                            :v_pvalor,
                                                                                            :v_paccion,
                                                                                            :v_ptarifa,
                                                                                            :v_pajuste,
                                                                                            :v_pporcentaje,
                                                                                            :v_pcomentario,
                                                                                            :v_json_row
                                                                                        ); end;');
                                                                                        
    oci_bind_by_name($consulta,':v_pnumero',$vacio);
    oci_bind_by_name($consulta,':v_pseccional',$request->seccional);
    oci_bind_by_name($consulta,':v_pnit',$request->prestador);
    oci_bind_by_name($consulta,':v_pregimen',$request->regimen);
    oci_bind_by_name($consulta,':v_pcontrato',$request->contrato);
    oci_bind_by_name($consulta,':v_pproducto',$request->producto);
    oci_bind_by_name($consulta,':v_pclasificacion',$request->clasificacion);
    oci_bind_by_name($consulta,':v_pobservacion',$request->descripcion);
    oci_bind_by_name($consulta,':v_plink',$request->ruta);
    oci_bind_by_name($consulta,':v_pvalor',$request->valor);
    oci_bind_by_name($consulta,':v_paccion',$accion);
    oci_bind_by_name($consulta,':v_ptarifa',$vacio);
    oci_bind_by_name($consulta,':v_pajuste',$vacio);
    oci_bind_by_name($consulta,':v_pporcentaje',$vacio);
    oci_bind_by_name($consulta,':v_pcomentario',$vacio);
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
  function listar_unico(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $codigo =$request->codigo;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_LISTA_SOLICITUD(    :v_pcodigo,
                                                                                      :v_json_row
                                                                                 ); end;');
    oci_bind_by_name($consulta,':v_pcodigo',$codigo);
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
  function listar(){
    require_once('../../config/dbcon_prod.php');
    global $request;

    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_LISTA_SOLICITUDES(:v_json_row
                                                                                 ); end;');
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
  function listar_contratos_contratacion(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_LISTA_PROD_CONTRATOS(   :v_regimen,
                                                                                    :v_contrato,
                                                                                    :v_pcodigo,
                                                                                    :v_json_row
                                                                                ); end;');
    oci_bind_by_name($consulta,':v_regimen',$request->regimen);
    oci_bind_by_name($consulta,':v_contrato',$request->contrato);
    oci_bind_by_name($consulta,':v_pcodigo',$request->producto);
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
  function obtenerTarifa(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_LISTA_TARIFA(   :v_pcodigo,
                                                                                  :v_producto,
                                                                                  :v_json_row
                                                                              ); end;');
   
    oci_bind_by_name($consulta,':v_pcodigo',$request->codigo);
    oci_bind_by_name($consulta,':v_producto',$request->producto);
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
  function contratos_ui(){
    require_once('../../config/dbcon_prod.php');
    global $request;

    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_UI_CONTRATO(      :v_pregimen,
                                                                                    :v_pcontrato,
                                                                                    :v_pproducto,
                                                                                    :v_pclasificacion,
                                                                                    :v_pvalor,
                                                                                    :v_ptarifa,
                                                                                    :v_pajuste,
                                                                                    :v_pporcentaje,
                                                                                    :v_paccion,
                                                                                    :v_prenglon,
                                                                                    :v_json_row
                                                                               ); end;');
                                                                                        
    oci_bind_by_name($consulta,':v_pregimen',$request->regimen);
    oci_bind_by_name($consulta,':v_pcontrato',$request->contrato);
    oci_bind_by_name($consulta,':v_pproducto',$request->producto);
    oci_bind_by_name($consulta,':v_pclasificacion',$request->clasificacion);
    oci_bind_by_name($consulta,':v_pvalor',$request->valor);
    oci_bind_by_name($consulta,':v_ptarifa',$request->tarifa);
    oci_bind_by_name($consulta,':v_pajuste',$request->porcentaje);
    oci_bind_by_name($consulta,':v_pporcentaje',$request->ajuste);
    oci_bind_by_name($consulta,':v_paccion',$request->accion);
    oci_bind_by_name($consulta,':v_prenglon',$request->renglon);
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

  function p_ui_prod_contrato(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $vacio='';
    $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CONFIG_CONTRATOS.P_UI_PROD_CONTRATO( :v_pnumero,
                                                                                    :v_pregimen,
                                                                                    :v_pcontrato,
                                                                                    :v_pproducto,
                                                                                    :v_pclasificacion,
                                                                                    :v_pvalor,
                                                                                    :v_ptarifa,
                                                                                    :v_pajuste,
                                                                                    :v_pporcentaje,
                                                                                    :v_plink,
                                                                                    :v_pobservacion,
                                                                                    :v_pnit,
                                                                                    :v_pcomentario,
                                                                                    :v_pseccional,
                                                                                    :v_paccion,
                                                                                    :v_json_row
                                                                                 ); end;');
                                                                                        
    oci_bind_by_name($consulta,':v_pnumero',$request->numero);
    oci_bind_by_name($consulta,':v_pregimen',$request->regimen);
    oci_bind_by_name($consulta,':v_pcontrato',$request->contrato);
    oci_bind_by_name($consulta,':v_pproducto',$request->producto);
    oci_bind_by_name($consulta,':v_pclasificacion',$request->clasificacion);
    oci_bind_by_name($consulta,':v_pvalor',$request->valor);
    oci_bind_by_name($consulta,':v_ptarifa',$request->tarifa);
    oci_bind_by_name($consulta,':v_pajuste',$request->ajuste);
    oci_bind_by_name($consulta,':v_pporcentaje',$request->porcentaje);
    oci_bind_by_name($consulta,':v_plink',$vacio);
    oci_bind_by_name($consulta,':v_pobservacion',$vacio);
    oci_bind_by_name($consulta,':v_pnit',$vacio);
    oci_bind_by_name($consulta,':v_pcomentario',$request->comentario);
    oci_bind_by_name($consulta,':v_pseccional',$vacio);
    oci_bind_by_name($consulta,':v_paccion',$request->accion);
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
