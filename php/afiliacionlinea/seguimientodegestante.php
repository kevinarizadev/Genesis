<?php
	
    $postdata = file_get_contents("php://input");
    // error_reporting(0);
    $request = json_decode($postdata);
    $function = $request->function;
    $function();


    function obtenerafiliados(){
      require_once('../config/dbcon_prod.php');
      global $request;
      $tipodocumento = $request->tipodocumento;
      $documento         = $request->documento;
      $documento         = $request->documento;
  
      $consulta = oci_parse($c,'begin PQ_GENESIS_SINIESTRO.P_CONSULTAR_GESTANTES(:v_presponsable,:v_ptipodoc,:v_pnumdoc,:v_pjson_row ); end;');
      oci_bind_by_name($consulta,':v_presponsable',$responsable);
      oci_bind_by_name($consulta,':v_ptipodoc',$tipodocumento);
      oci_bind_by_name($consulta,':v_pnumdoc',$documento);
      $clob = oci_new_descriptor($c,OCI_D_LOB);
      oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
      oci_execute($consulta,OCI_DEFAULT);
      if (isset($clob)) {
        $json = $clob->read($clob->size());
        echo $json;
      }else{
        echo 0;
      }
      oci_close($c);
    }


	function enviar_formulariovieja(){
		require_once('../config/dbcon_prod.php');
		global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_SINIESTRO.p_segui_gestante(:v_pjson_row_in,:v_pjson_row_out); end;');
		oci_bind_by_name($consulta,':v_pjson_row_in',$request->datos);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		if (isset($clob)) {
			$json = $clob->read($clob->size());
			echo $json;
		}else{
			echo 0;
		}
		oci_close($c);
    }

        function enviar_formulario(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_SINIESTRO.P_SEGUI_GESTANTE(:v_pjson_row_in,:v_pjson_row_out); end;');
        oci_bind_by_name($consulta,':v_pjson_row_in',$request->datos);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo 0;
        }
        oci_close($c);
    }


        function notificar_Afiliado(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_SINIESTRO.P_ACTIVAR_REGISTRO_GS(:v_ptipodoc,
                                                                                      :v_pnumdoc,
                                                                                      :v_pconcepto,
                                                                                      :v_pfuente,
                                                                                      :v_pgestion,
                                                                                      :v_pradicado ,
                                                                                      :v_presponsable,
                                                                                      :v_pdiagnostico,
                                                                                      :v_pjson_row); end;');
        oci_bind_by_name($consulta,':v_ptipodoc',$request->tipog);
        oci_bind_by_name($consulta,':v_pnumdoc',$request->numerodg);
        oci_bind_by_name($consulta,':v_pconcepto',$request->conceptog);
        oci_bind_by_name($consulta,':v_pfuente',$request->fuenteg);
        oci_bind_by_name($consulta,':v_pgestion',$request->gestiong);
        oci_bind_by_name($consulta,':v_pradicado',$request->radicadog);
        oci_bind_by_name($consulta,':v_presponsable',$request->responsableg);
        oci_bind_by_name($consulta,':v_pdiagnostico',$request->diagnosticog);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{
            echo 0;
        }
        oci_close($c);
    }
    
    function visualizardatos(){
        require_once('../config/dbcon_prod.php');
        global $request;  
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_SINIESTRO.p_listar_gestante (:v_pjson_row_out); end;');
        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
      }

      function visualizardatosExcel(){
        require_once('../config/dbcon_prod.php');
        global $request;  
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_SINIESTRO.p_descarga_gestante (:v_pfecha1,
                                                                                   :v_pfecha2,
                                                                                   :v_pjson_row_out); end;');
		    oci_bind_by_name($consulta,':v_pfecha1',$request->fecha_inicio);        
    		oci_bind_by_name($consulta,':v_pfecha2',$request->fecha_final);        
        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
      }


        function Buscar_Afiliado()
      {
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'begin PQ_GENESIS_GESTION_ACGS.P_CONSULTA_AFILIADO(:v_ptipodoc,:v_pnumdoc,:v_pjson_row); end;');
        oci_bind_by_name($consulta, ':v_ptipodoc', $request->Tipo_Doc);
        oci_bind_by_name($consulta, ':v_pnumdoc', $request->Num_Doc);
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

      
      
  function Obtener_Diagnostico()
      {
        require_once('../config/dbcon_prod.php');
        global $request;
        $Doc = 'GS';
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_SINIESTRO.P_LISTAR_DIAGNOSTICO_EM(:v_pdiagno,:v_pjson_row); end;');
        oci_bind_by_name($consulta, ':v_pdiagno', $request->Conc);
        // oci_bind_by_name($consulta, ':v_pdocumento', $Doc);
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


      function visualizar_detalles(){
        require_once('../config/dbcon_prod.php');
        global $request;  
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_SINIESTRO.p_listar_gestante_detalle(:v_pkeyword, :v_pjson_row_out); end;');
		oci_bind_by_name($consulta,':v_pkeyword',$request->consecutivo);        
        $clob = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
        oci_execute($consulta, OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);
      }
	
	

