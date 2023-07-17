<?php
   $postdata = file_get_contents("php://input");
   $request = json_decode($postdata);
   $function = $request->function;
   $function();
   function insertarfosyga(){
      require_once('../config/dbcon_prod.php');
      global $request;
      $empresa         = 1;
      $identificador   = $request->identificador;
      $tipodoc            = $request->tipodoc;
      $documento        = $request->documento;
      $primernombre    = $request->primernombre;
      $segundonombre = (isset($request->segundonombre) ? $request->segundonombre : false);
      $primerapellido  = $request->primerapellido;
      $segundoapellido = (isset($request->segundoapellido) ? $request->segundoapellido : false);
      $fecnacimiento   = isset($request->fecnacimiento) ? $request->fecnacimiento : '';
      $fecafiliacion     = isset($request->fecafiliacion) ? $request->fecafiliacion : '';
      $departamento      = $request->departamento;
      $municipio       = $request->municipio;
      $estado          = $request->estado;
      $entidad         = $request->entidad;
      $regimen            = $request->regimen;
      $tipoafiliado      = $request->tipoafiliado;


      $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AL.P_INSERTA_DATOS_FOSYGA_NEW(:v_pempresa,:v_identificador,:v_tipo_identificacion,:v_numero_identificacion,:v_primer_nombre,:v_segundo_nombre,
                                                                :v_primer_apellido,:v_segundo_apellido,:v_nacimiento,:v_fafiliacion,:v_depto,:v_muni,:v_estado,:v_entidad,:v_regimen,:v_tipo_afiliado,:v_json_row); end;');
      oci_bind_by_name($consulta,':v_pempresa',$empresa);
      oci_bind_by_name($consulta,':v_identificador',$identificador);
      oci_bind_by_name($consulta,':v_tipo_identificacion',$tipodoc);
      oci_bind_by_name($consulta,':v_numero_identificacion',$documento);
      oci_bind_by_name($consulta,':v_primer_nombre',$primernombre);
      oci_bind_by_name($consulta,':v_segundo_nombre',$segundonombre);
      oci_bind_by_name($consulta,':v_primer_apellido',$primerapellido);
      oci_bind_by_name($consulta,':v_segundo_apellido',$segundoapellido);
      oci_bind_by_name($consulta,':v_nacimiento',$fecnacimiento);
      oci_bind_by_name($consulta,':v_fafiliacion',$fecafiliacion);
      oci_bind_by_name($consulta,':v_depto',$departamento);
      oci_bind_by_name($consulta,':v_muni',$municipio);
      oci_bind_by_name($consulta,':v_estado',$estado);
      oci_bind_by_name($consulta,':v_entidad',$entidad);
      oci_bind_by_name($consulta,':v_regimen',$regimen);
      oci_bind_by_name($consulta,':v_tipo_afiliado',$tipoafiliado);
      $clob = oci_new_descriptor($c,OCI_D_LOB);
      oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);

      oci_execute($consulta,OCI_DEFAULT);
      $json = $clob->read($clob->size());
      echo $json;

      oci_close($c);
      }
   function insertarsoporteBen(){
   require_once('../config/dbcon_prod.php');
   global $request;
   $empresa         = 1;
   $tipodoc 		     = $request->tipodoc;
   $documento 		   = $request->documento;
   $afiliado        = $request->anexo;
   $hoy = date("dmY");
   $ruta            = $request->ruta;
   $ubicacion       = '1';
   $estado          = 'X';
   $observacion     = 'PORTAL GENESIS';

   $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AL.P_INS_SOPORTE_DOC(:v_pempresa,:v_pdocumento,:v_ptipo_doc_afiliado,:v_pafiliado,:v_pruta,:v_pubicacion,
                                                        :v_pestado,:v_pobservacion); end;');
   oci_bind_by_name($consulta,':v_pempresa',$empresa);
   oci_bind_by_name($consulta,':v_ptipo_doc_afiliado',$tipodoc);
   oci_bind_by_name($consulta,':v_pdocumento',$afiliado);
   oci_bind_by_name($consulta,':v_pafiliado',$documento);
   oci_bind_by_name($consulta,':v_pruta',$ruta);
   oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
   oci_bind_by_name($consulta,':v_pestado',$estado);
   oci_bind_by_name($consulta,':v_pobservacion',$observacion);

   oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
   oci_close($c);

   echo "1";
   }
   function insertarsoporte(){
   require_once('../config/dbcon_prod.php');
   global $request;
   $empresa         = 1;
   $tipodoc            = $request->tipodoc;
   $documento        = $request->documento;
   $afiliado        = $request->anexo;
   $hoy = date("dmY");
   $ruta            = "cargue_ftp/Digitalizacion/Genesis/Aseguramiento/".$hoy.'/'.$request->filename;
   $ubicacion       = '1';
   $estado          = 'X';
   $observacion     = 'test';

   $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AL.P_INS_SOPORTE_DOC(:v_pempresa,:v_pdocumento,:v_ptipo_doc_afiliado,:v_pafiliado,:v_pruta,:v_pubicacion,
                                                        :v_pestado,:v_pobservacion); end;');
   oci_bind_by_name($consulta,':v_pempresa',$empresa);
   oci_bind_by_name($consulta,':v_ptipo_doc_afiliado',$tipodoc);
   oci_bind_by_name($consulta,':v_pdocumento',$afiliado);
   oci_bind_by_name($consulta,':v_pafiliado',$documento);
   oci_bind_by_name($consulta,':v_pruta',$ruta);
   oci_bind_by_name($consulta,':v_pubicacion',$ubicacion);
   oci_bind_by_name($consulta,':v_pestado',$estado);
   oci_bind_by_name($consulta,':v_pobservacion',$observacion);

   oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
   oci_close($c);
   }
   function insertarafiliado(){
   require_once('../config/dbcon_prod.php');
   global $request;
   $empresa                = 1;
   $tipo_documento         = $request->tipo_documento;
   $documento               = $request->documento;
   $cbf_tipo_documento     = $request->cbf_tipo_documento;
   $cbf_documento          = $request->cbf_documento;
   $cbf_tipo               = $request->cbf_tipo;
   $primer_nombre          = $request->primer_nombre;
   $segundo_nombre = (isset($request->segundo_nombre) ? $request->segundo_nombre : false);
   $primer_apellido        = $request->primer_apellido;
   $segundo_apellido = (isset($request->segundo_apellido) ? $request->segundo_apellido : false);
   $nacimiento              = $request->nacimiento;
   $sexo                   = $request->sexo;
   $regimen                = $request->regimen;
   $etnia                  = $request->etnia;
   $discapacidad           = $request->discapacidad;


   $metodogpoblacional          = $request->metodogpoblacional;
   $gruposisben           = $request->gruposisben;
   $subgruposisben           = $request->subgruposisben;
   $causalafi_oficio           = $request->causalafi_oficio;


   $condicion               = $request->condicion;
   $nivelsisben = (isset($request->nivelsisben) ? $request->nivelsisben : false);
   $puntajesisben = (isset($request->puntajesisben) ? $request->puntajesisben : false);
   $fichasisben = (isset($request->fichasisben) ? $request->fichasisben : false);
   $gpoblacional           = $request->gpoblacional;
   $direccion = (isset($request->direccion) ? $request->direccion : false);
   $telefono = (isset($request->telefono) ? $request->telefono : false);
   $celular = (isset($request->celular) ? $request->celular : false);
   $correo = (isset($request->correo) ? $request->correo : false);
   $municipio              = $request->municipio;
   $zona                   = $request->zona;
   $localidad = (isset($request->localidad) ? $request->localidad : false);
   $ips                    = $request->ips;
   $tipo_documento_bdua    = $request->tipo_documento_bdua;
   $documento_bdua         = $request->documento_bdua;
   $primer_nombre_bdua       = $request->primer_nombre_bdua;
   $segundo_nombre_bdua = (isset($request->segundo_nombre_bdua) ? $request->segundo_nombre_bdua : false);
   $primer_apellido_bdua   = $request->primer_apellido_bdua;
   $segundo_apellido_bdua = (isset($request->segundo_apellido_bdua) ? $request->segundo_apellido_bdua : false);
   $nacimiento_bdua         = (isset($request->nacimiento_bdua) ? $request->nacimiento_bdua : '');
   $sexo_bdua               = $request->sexo_bdua;
   $parentesco             = $request->parentesco;
   $estado_afiliado        = (isset($request->estado) ? $request->estado : 'AC');
   $documento_temp          = 'PA';
   $numero_temp             = 1;
   $ubicacion_temp          = 0;
   $renglon_temp           = 1;
   $fecha_afiliacion = (isset($request->fecha_afiliacion) ? $request->fecha_afiliacion : date("d/m/Y"));

   $consulta = oci_parse($c,'BEGIN PQ_GENESIS_AL.P_EPRI_AFILIACION(:v_pempresa,:v_estado_afiliado,:v_pdocumento,:v_pnumero,:v_pubicacion,:v_ptipo_documento,:v_pnumerodocumento,:v_ptipo_cbf,:v_pparentesco,:v_pcabezatipodocumento,:v_pcabezanumerodocumento,:v_pprimer_nombre,:v_ppsegundo_nombre,:v_pprimer_apellido,
                                                        :v_psegundo_apellido,:v_pnacimiento,:v_psexo,:v_pregimen,:v_petnia,:v_pdiscapacidad,:v_pcondicion,:v_pnivelsisben,:v_pfichasisben,:v_ppuntajesisben,:v_pgpoblacional,:v_pdireccion,:v_ptelefono,:v_pcelular,:v_pcorreo,
                                                        :v_pmunicipio,:v_pzona,:v_plocalidad,:v_pips,:v_ptipodocumento_bdua,:v_pnumerodocumento_bdua,:v_pprimer_nombre_bdua,:v_ppsegundo_nombre_bdua,:v_pprimer_apellido_bdua,:v_psegundo_apellido_bdua,:v_pnacimiento_bdua,:v_psexo_bdua,
                                                        :v_renglon,:v_fecha_afiliacion,:v_responsable,:v_pmetodologia_grupo_pob,:v_pgrupo_sisben_iv,:v_psubgrupo_sisben_iv,
                                                        :v_pcausal_oficio,:v_salida,:v_mensaje); end;');
   oci_bind_by_name($consulta,':v_pempresa',$empresa);
   oci_bind_by_name($consulta,':v_estado_afiliado',$estado_afiliado);
   oci_bind_by_name($consulta,':v_pdocumento',$documento_temp);
   oci_bind_by_name($consulta,':v_pnumero',$numero_temp);
   oci_bind_by_name($consulta,':v_pubicacion',$ubicacion_temp);
   oci_bind_by_name($consulta,':v_ptipo_documento',$tipo_documento);
   oci_bind_by_name($consulta,':v_pnumerodocumento',$documento);
   oci_bind_by_name($consulta,':v_ptipo_cbf',$cbf_tipo);
   oci_bind_by_name($consulta,':v_pparentesco',$parentesco);
   oci_bind_by_name($consulta,':v_pcabezatipodocumento',$cbf_tipo_documento);
   oci_bind_by_name($consulta,':v_pcabezanumerodocumento',$cbf_documento);
   oci_bind_by_name($consulta,':v_pprimer_nombre',$primer_nombre);
   oci_bind_by_name($consulta,':v_ppsegundo_nombre',$segundo_nombre);
   oci_bind_by_name($consulta,':v_pprimer_apellido',$primer_apellido);
   oci_bind_by_name($consulta,':v_psegundo_apellido',$segundo_apellido);
   oci_bind_by_name($consulta,':v_pnacimiento',$nacimiento);
   oci_bind_by_name($consulta,':v_psexo',$sexo);
   oci_bind_by_name($consulta,':v_pregimen',$regimen);
   oci_bind_by_name($consulta,':v_petnia',$etnia);
   oci_bind_by_name($consulta,':v_pdiscapacidad',$discapacidad);
   oci_bind_by_name($consulta,':v_pcondicion',$condicion);
   oci_bind_by_name($consulta,':v_pnivelsisben',$nivelsisben);
   oci_bind_by_name($consulta,':v_pfichasisben',$fichasisben);
   oci_bind_by_name($consulta,':v_ppuntajesisben',$puntajesisben);
   oci_bind_by_name($consulta,':v_pgpoblacional',$gpoblacional);
   oci_bind_by_name($consulta,':v_pdireccion',$direccion);
   oci_bind_by_name($consulta,':v_ptelefono',$telefono);
   oci_bind_by_name($consulta,':v_pcelular',$celular);
   oci_bind_by_name($consulta,':v_pcorreo',$correo);
   oci_bind_by_name($consulta,':v_pmunicipio',$municipio);
   oci_bind_by_name($consulta,':v_pzona',$zona);
   oci_bind_by_name($consulta,':v_plocalidad',$localidad);
   oci_bind_by_name($consulta,':v_pips',$ips);
   oci_bind_by_name($consulta,':v_ptipodocumento_bdua',$tipo_documento_bdua);
   oci_bind_by_name($consulta,':v_pnumerodocumento_bdua',$documento_bdua);
   oci_bind_by_name($consulta,':v_pprimer_nombre_bdua',$primer_nombre_bdua);
   oci_bind_by_name($consulta,':v_ppsegundo_nombre_bdua',$segundo_nombre_bdua);
   oci_bind_by_name($consulta,':v_pprimer_apellido_bdua',$primer_apellido_bdua);
   oci_bind_by_name($consulta,':v_psegundo_apellido_bdua',$segundo_apellido_bdua);
   oci_bind_by_name($consulta,':v_pnacimiento_bdua',$nacimiento_bdua);
   oci_bind_by_name($consulta,':v_psexo_bdua',$sexo_bdua);
   oci_bind_by_name($consulta,':v_renglon',$renglon_temp);
   oci_bind_by_name($consulta,':v_fecha_afiliacion',$fecha_afiliacion);
   oci_bind_by_name($consulta,':v_responsable',$request->responsable);

   oci_bind_by_name($consulta,':v_pmetodologia_grupo_pob',$request->metodogpoblacional);
   oci_bind_by_name($consulta,':v_pgrupo_sisben_iv',$request->gruposisben);
   oci_bind_by_name($consulta,':v_psubgrupo_sisben_iv',$request->subgruposisben);
   oci_bind_by_name($consulta,':v_pcausal_oficio',$request->causalafi_oficio);


   oci_bind_by_name($consulta,':v_salida',$respuesta2,200);
   oci_bind_by_name($consulta,':v_mensaje',$respuesta,50);

   oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
   echo $respuesta2;

   oci_close($c);
   }
?>
