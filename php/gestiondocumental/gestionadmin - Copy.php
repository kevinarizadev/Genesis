<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();
	//////////////////////////OBTENER///////////////////////
	function obtenerseccionales(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$codigo = $request->codigo;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ADM.P_OBTENER_OFICINA_ADM(:v_cod,:v_json_row); end;');
		// oci_bind_by_name($consulta,':v_pcedula',$_SESSION['cedula']);
		oci_bind_by_name($consulta,':v_cod',$codigo);
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
	function obtenernumeros(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ADM.P_OBTENER_NUMEROS(:v_json_row); end;');
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

	function obtenercodigo(){
		echo $_SESSION['codmunicipio'];
	}
	function obtenerusu(){
		echo $_SESSION['usu'];
	}
	//////////////////BUSCAR////////////
	function obteneroficina(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$id = $request->id;
		$con = $request->con;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ADM.P_OBTENER_ESTADO(:v_pid,:v_con,:v_json_row); end;');
		oci_bind_by_name($consulta,':v_pid',$id);
		oci_bind_by_name($consulta,':v_con',$con);
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
	////////////////////Guardar Historico Seccional Detalle///////////////////////////
    function guardarhistorico_detalle(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$id = $request->id;
		$con = $request->con;
		$hoy=date("d/m/Y");
		$json = $request->json;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ADM.P_OFICINA_HISTORICO_DETALLE(:vp_id,:vp_con,:vp_fecha,:vp_resp,:vp_dir,:vp_arrenda,:vp_nit,
		:vp_fec_ape,:vp_dura,:vp_venc,:vp_notif,:vp_valor,:vp_incre,:vp_canon,:vp_ener,:vp_aaa,:vp_telef,:vp_cant_usu,:vp_contac,:vp_estmob,:vp_estarr,:vp_res); end;');
		oci_bind_by_name($consulta,':vp_id',$id);
		oci_bind_by_name($consulta,':vp_con',$con);
		oci_bind_by_name($consulta,':vp_fecha',$hoy);
		oci_bind_by_name($consulta,':vp_resp',$_SESSION['cedula']);
		oci_bind_by_name($consulta,':vp_dir',$json[0]->DIR);
		oci_bind_by_name($consulta,':vp_arrenda',$json[0]->ARRENDA);
		oci_bind_by_name($consulta,':vp_nit',$json[0]->NIT);
		oci_bind_by_name($consulta,':vp_fec_ape',$json[0]->FEC_APE);
		oci_bind_by_name($consulta,':vp_dura',$json[0]->DURA);
		oci_bind_by_name($consulta,':vp_venc',$json[0]->VENC);
		oci_bind_by_name($consulta,':vp_notif',$json[0]->NOTIF);
		oci_bind_by_name($consulta,':vp_valor',$json[0]->VALOR);
		oci_bind_by_name($consulta,':vp_incre',$json[0]->INCRE);
		oci_bind_by_name($consulta,':vp_canon',$json[0]->CANON);
		oci_bind_by_name($consulta,':vp_ener',$json[0]->ENER);
		oci_bind_by_name($consulta,':vp_aaa',$json[0]->AAA);
		oci_bind_by_name($consulta,':vp_telef',$json[0]->TELEF);
		oci_bind_by_name($consulta,':vp_cant_usu',$json[0]->CANT_USU);
		oci_bind_by_name($consulta,':vp_contac',$json[0]->CONTAC);
		oci_bind_by_name($consulta,':vp_estmob',$json[0]->MOBIL);
		oci_bind_by_name($consulta,':vp_estarr',$json[0]->ARRIENDO);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':vp_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
		oci_close($c);	
	}
	////////////////////Guardar Historico Seccional Implementos///////////////////////////
    function guardarhistorico_implementos(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$id = $request->id;
		$con = $request->con;
		$hoy=date("d/m/Y");
		$json = $request->json;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ADM.P_OFICINA_HISTORICO_IMPLEMENTOS(:vp_id,:vp_con,:vp_fecha,:vp_resp,:vp_cpuesto,:vp_epuesto,:vp_ccaunter,:vp_ecaunter,:vp_csillae,:vp_esillae,:vp_carchivadorp,:vp_earchivadorp,:vp_carchivadorr,
		:vp_earchivadorr,:vp_csillai,:vp_esillai,:vp_cmesa,:vp_emesa,:vp_ctandem,:vp_etandem,:vp_cventilador,:vp_eventilador,
		:vp_caire,:vp_eaire,:vp_ccomputador,:vp_ecomputador,:vp_cimpresora,:vp_eimpresora,:vp_ccelular,:vp_ecelular,:vp_ctelefono,:vp_etelefono,:vp_cmodem,
		:vp_emodem,:vp_ccartelera,:vp_ecartelera,:vp_cbuzon,:vp_ebuzon,:vp_cbotiquin,:vp_ebotiquin,:vp_ccamilla,:vp_ecamilla,:vp_cextintor,:vp_eextintor,
		:vp_cavisoc,:vp_eavisoc,:vp_cavisof,:vp_eavisof,:vp_csenalizacion,:vp_esenalizacion,:vp_cformato,:vp_eformato,:vp_cavisoa,:vp_eavisoa,:vp_ctelevisor,
		:vp_etelevisor,:vp_cdispensador,:vp_edispensador,:vp_cavisos,:vp_eavisos,:vp_cmarcacion,:vp_emarcacion,:vp_cmision,:vp_emision, :vp_creglamento,:vp_ereglamento, 
		:vp_cbanio,:vp_ebanio, :vp_crampa,:vp_erampa, :vp_cestante,:vp_eestante,:vp_res); end;');
		oci_bind_by_name($consulta,':vp_id',$id);
		oci_bind_by_name($consulta,':vp_con',$con);
		oci_bind_by_name($consulta,':vp_fecha',$hoy);
		oci_bind_by_name($consulta,':vp_resp',$_SESSION['cedula']);
		oci_bind_by_name($consulta,':vp_cpuesto',$json[0]->CPUESTO);
		oci_bind_by_name($consulta,':vp_epuesto',$json[0]->EPUESTO);
		oci_bind_by_name($consulta,':vp_ccaunter',$json[0]->CCAUNTER);
		oci_bind_by_name($consulta,':vp_ecaunter',$json[0]->ECAUNTER);
		oci_bind_by_name($consulta,':vp_csillae',$json[0]->CSILLAE);
		oci_bind_by_name($consulta,':vp_esillae',$json[0]->ESILLAE);
		oci_bind_by_name($consulta,':vp_carchivadorp',$json[0]->CARCHIVADORP);
		oci_bind_by_name($consulta,':vp_earchivadorp',$json[0]->EARCHIVADORP);
		oci_bind_by_name($consulta,':vp_carchivadorr',$json[0]->CARCHIVADORR);
		oci_bind_by_name($consulta,':vp_earchivadorr',$json[0]->EARCHIVADORR);
		oci_bind_by_name($consulta,':vp_csillai',$json[0]->CSILLAI);
		oci_bind_by_name($consulta,':vp_esillai',$json[0]->ESILLAI);
		oci_bind_by_name($consulta,':vp_cmesa',$json[0]->CMESA);
		oci_bind_by_name($consulta,':vp_emesa',$json[0]->EMESA);
		oci_bind_by_name($consulta,':vp_ctandem',$json[0]->CTANDEM);
		oci_bind_by_name($consulta,':vp_etandem',$json[0]->ETANDEM);
		oci_bind_by_name($consulta,':vp_cventilador',$json[0]->CVENTILADOR);
		oci_bind_by_name($consulta,':vp_eventilador',$json[0]->EVENTILADOR);
		oci_bind_by_name($consulta,':vp_caire',$json[0]->CAIRE);
		oci_bind_by_name($consulta,':vp_eaire',$json[0]->EAIRE);
		oci_bind_by_name($consulta,':vp_ccomputador',$json[0]->CCOMPUTADOR);
		oci_bind_by_name($consulta,':vp_ecomputador',$json[0]->ECOMPUTADOR);
		oci_bind_by_name($consulta,':vp_cimpresora',$json[0]->CIMPRESORA);
		oci_bind_by_name($consulta,':vp_eimpresora',$json[0]->EIMPRESORA);
		oci_bind_by_name($consulta,':vp_ccelular',$json[0]->CCELULAR);
		oci_bind_by_name($consulta,':vp_ecelular',$json[0]->ECELULAR);
		oci_bind_by_name($consulta,':vp_ctelefono',$json[0]->CTELEFONO);
		oci_bind_by_name($consulta,':vp_etelefono',$json[0]->ETELEFONO);
		oci_bind_by_name($consulta,':vp_cmodem',$json[0]->CMODEM);
		oci_bind_by_name($consulta,':vp_emodem',$json[0]->EMODEM);
		oci_bind_by_name($consulta,':vp_ccartelera',$json[0]->CCARTELERA);
		oci_bind_by_name($consulta,':vp_ecartelera',$json[0]->ECARTELERA);
		oci_bind_by_name($consulta,':vp_cbuzon',$json[0]->CBUZON);
		oci_bind_by_name($consulta,':vp_ebuzon',$json[0]->EBUZON);
		oci_bind_by_name($consulta,':vp_cbotiquin',$json[0]->CBOTIQUIN);
		oci_bind_by_name($consulta,':vp_ebotiquin',$json[0]->EBOTIQUIN);
		oci_bind_by_name($consulta,':vp_ccamilla',$json[0]->CCAMILLA);
		oci_bind_by_name($consulta,':vp_ecamilla',$json[0]->ECAMILLA);
		oci_bind_by_name($consulta,':vp_cextintor',$json[0]->CEXTINTOR);
		oci_bind_by_name($consulta,':vp_eextintor',$json[0]->EEXTINTOR);
		oci_bind_by_name($consulta,':vp_cavisoc',$json[0]->CAVISOC);
		oci_bind_by_name($consulta,':vp_eavisoc',$json[0]->EAVISOC);
		oci_bind_by_name($consulta,':vp_cavisof',$json[0]->CAVISOF);
		oci_bind_by_name($consulta,':vp_eavisof',$json[0]->EAVISOF);
		oci_bind_by_name($consulta,':vp_csenalizacion',$json[0]->CSENALIZACION);
		oci_bind_by_name($consulta,':vp_esenalizacion',$json[0]->ESENALIZACION);
		oci_bind_by_name($consulta,':vp_cformato',$json[0]->CFORMATO);
		oci_bind_by_name($consulta,':vp_eformato',$json[0]->EFORMATO);
		oci_bind_by_name($consulta,':vp_cavisoa',$json[0]->CAVISOA);
		oci_bind_by_name($consulta,':vp_eavisoa',$json[0]->EAVISOA);
		oci_bind_by_name($consulta,':vp_ctelevisor',$json[0]->CTELEVISOR);
		oci_bind_by_name($consulta,':vp_etelevisor',$json[0]->ETELEVISOR);
		oci_bind_by_name($consulta,':vp_cdispensador',$json[0]->CDISPENSADOR);
		oci_bind_by_name($consulta,':vp_edispensador',$json[0]->EDISPENSADOR);
		oci_bind_by_name($consulta,':vp_cavisos',$json[0]->CAVISOS);
		oci_bind_by_name($consulta,':vp_eavisos',$json[0]->EAVISOS);
		oci_bind_by_name($consulta,':vp_cmarcacion',$json[0]->CMARCACION);
		oci_bind_by_name($consulta,':vp_emarcacion',$json[0]->EMARCACION);
		oci_bind_by_name($consulta,':vp_cmision',$json[0]->CMISION);
		oci_bind_by_name($consulta,':vp_emision',$json[0]->EMISION);
		oci_bind_by_name($consulta,':vp_creglamento',$json[0]->CREGLAMENTO);
		oci_bind_by_name($consulta,':vp_ereglamento',$json[0]->EREGLAMENTO);
		oci_bind_by_name($consulta,':vp_cbanio',$json[0]->CBANIO);
		oci_bind_by_name($consulta,':vp_ebanio',$json[0]->EBANIO);
		oci_bind_by_name($consulta,':vp_crampa',$json[0]->CRAMPA);
		oci_bind_by_name($consulta,':vp_erampa',$json[0]->ERAMPA);
		oci_bind_by_name($consulta,':vp_cestante',$json[0]->CESTANTE);
		oci_bind_by_name($consulta,':vp_eestante',$json[0]->EESTANTE);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':vp_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);		
	}
	////////////////////Actualizar Seccional///////////////////////////
    function actualizarseccional_detalle(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$id = $request->id;
		$con = $request->con;
		$json = json_decode($request->json);
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ADM.P_ACTUALIZAR_OFICINA_DETALLE(:vp_id,:vp_con,:vp_dir,:vp_arrenda,:vp_nit,:vp_fec_ape,:vp_dura,:vp_venc,:vp_notif,:vp_valor,
		:vp_incre,:vp_canon,:vp_ener,:vp_aaa,:vp_telef,:vp_cant_usu,:vp_contac,:vp_mobil,:vp_arriendo,:vp_resp,:vp_res); end;');
		oci_bind_by_name($consulta,':vp_id',$id);
		oci_bind_by_name($consulta,':vp_con',$con);
		oci_bind_by_name($consulta,':vp_dir',$json[0]->DIR);
		oci_bind_by_name($consulta,':vp_arrenda',$json[0]->ARRENDA);
		oci_bind_by_name($consulta,':vp_nit',$json[0]->NIT);
		oci_bind_by_name($consulta,':vp_fec_ape',$json[0]->FEC_APE);
		oci_bind_by_name($consulta,':vp_dura',$json[0]->DURA);
		oci_bind_by_name($consulta,':vp_venc',$json[0]->VENC);
		oci_bind_by_name($consulta,':vp_notif',$json[0]->NOTIF);
		oci_bind_by_name($consulta,':vp_valor',$json[0]->VALOR);
		oci_bind_by_name($consulta,':vp_incre',$json[0]->INCRE);
		oci_bind_by_name($consulta,':vp_canon',$json[0]->CANON);
		oci_bind_by_name($consulta,':vp_ener',$json[0]->ENER);
		oci_bind_by_name($consulta,':vp_aaa',$json[0]->AAA);
		oci_bind_by_name($consulta,':vp_telef',$json[0]->TELEF);
		oci_bind_by_name($consulta,':vp_cant_usu',$json[0]->CANT_USU);
		oci_bind_by_name($consulta,':vp_contac',$json[0]->CONTAC);
		oci_bind_by_name($consulta,':vp_mobil',$json[0]->MOBILIARIO);
		oci_bind_by_name($consulta,':vp_arriendo',$json[0]->ARRIENDO);
		oci_bind_by_name($consulta,':vp_resp', $_SESSION['cedula']);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':vp_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);		
	}
	//
	function actualizarseccional_implementos(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$id = $request->id;
		$con = $request->con;
		$json = json_decode($request->json);
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ADM.P_ACTUALIZAR_OFICINA_IMPLEMENTOS(:vp_id,:vp_con,:vp_cpuesto,:vp_epuesto,:vp_ccaunter,:vp_ecaunter,:vp_csillae,:vp_esillae,:vp_carchivadorp,
		:vp_earchivadorp,:vp_carchivadorr,:vp_earchivadorr,:vp_csillai,:vp_esillai,:vp_cmesa,:vp_emesa,:vp_ctandem,:vp_etandem,:vp_cventilador,:vp_eventilador,
		:vp_caire,:vp_eaire,:vp_ccomputador,:vp_ecomputador,:vp_cimpresora,:vp_eimpresora,:vp_ccelular,:vp_ecelular,:vp_ctelefono,:vp_etelefono,:vp_cmodem,
		:vp_emodem,:vp_ccartelera,:vp_ecartelera,:vp_cbuzon,:vp_ebuzon,:vp_cbotiquin,:vp_ebotiquin,:vp_ccamilla,:vp_ecamilla,:vp_cextintor,:vp_eextintor,
		:vp_cavisoc,:vp_eavisoc,:vp_cavisof,:vp_eavisof,:vp_csenalizacion,:vp_esenalizacion,:vp_cformato,:vp_eformato,:vp_cavisoa,:vp_eavisoa,:vp_ctelevisor,
		:vp_etelevisor,:vp_cdispensador,:vp_edispensador,:vp_cavisos,:vp_eavisos,:vp_cmarcacion,:vp_emarcacion,:vp_cmision,:vp_emision, :vp_creglamento,:vp_ereglamento, 
		:vp_cbanio,:vp_ebanio, :vp_crampa,:vp_erampa, :vp_cestante,:vp_eestante,:vp_res); end;');
		oci_bind_by_name($consulta,':vp_id',$id);
		oci_bind_by_name($consulta,':vp_con',$con);
		oci_bind_by_name($consulta,':vp_cpuesto',$json[0]->CPUESTO);
		oci_bind_by_name($consulta,':vp_epuesto',$json[0]->EPUESTO);
		oci_bind_by_name($consulta,':vp_ccaunter',$json[0]->CCAUNTER);
		oci_bind_by_name($consulta,':vp_ecaunter',$json[0]->ECAUNTER);
		oci_bind_by_name($consulta,':vp_csillae',$json[0]->CSILLAE);
		oci_bind_by_name($consulta,':vp_esillae',$json[0]->ESILLAE);
		oci_bind_by_name($consulta,':vp_carchivadorp',$json[0]->CARCHIVADORP);
		oci_bind_by_name($consulta,':vp_earchivadorp',$json[0]->EARCHIVADORP);
		oci_bind_by_name($consulta,':vp_carchivadorr',$json[0]->CARCHIVADORR);
		oci_bind_by_name($consulta,':vp_earchivadorr',$json[0]->EARCHIVADORR);
		oci_bind_by_name($consulta,':vp_csillai',$json[0]->CSILLAI);
		oci_bind_by_name($consulta,':vp_esillai',$json[0]->ESILLAI);
		oci_bind_by_name($consulta,':vp_cmesa',$json[0]->CMESA);
		oci_bind_by_name($consulta,':vp_emesa',$json[0]->EMESA);
		oci_bind_by_name($consulta,':vp_ctandem',$json[0]->CTANDEM);
		oci_bind_by_name($consulta,':vp_etandem',$json[0]->ETANDEM);
		oci_bind_by_name($consulta,':vp_cventilador',$json[0]->CVENTILADOR);
		oci_bind_by_name($consulta,':vp_eventilador',$json[0]->EVENTILADOR);
		oci_bind_by_name($consulta,':vp_caire',$json[0]->CAIRE);
		oci_bind_by_name($consulta,':vp_eaire',$json[0]->EAIRE);
		oci_bind_by_name($consulta,':vp_ccomputador',$json[0]->CCOMPUTADOR);
		oci_bind_by_name($consulta,':vp_ecomputador',$json[0]->ECOMPUTADOR);
		oci_bind_by_name($consulta,':vp_cimpresora',$json[0]->CIMPRESORA);
		oci_bind_by_name($consulta,':vp_eimpresora',$json[0]->EIMPRESORA);
		oci_bind_by_name($consulta,':vp_ccelular',$json[0]->CCELULAR);
		oci_bind_by_name($consulta,':vp_ecelular',$json[0]->ECELULAR);
		oci_bind_by_name($consulta,':vp_ctelefono',$json[0]->CTELEFONO);
		oci_bind_by_name($consulta,':vp_etelefono',$json[0]->ETELEFONO);
		oci_bind_by_name($consulta,':vp_cmodem',$json[0]->CMODEM);
		oci_bind_by_name($consulta,':vp_emodem',$json[0]->EMODEM);
		oci_bind_by_name($consulta,':vp_ccartelera',$json[0]->CCARTELERA);
		oci_bind_by_name($consulta,':vp_ecartelera',$json[0]->ECARTELERA);
		oci_bind_by_name($consulta,':vp_cbuzon',$json[0]->CBUZON);
		oci_bind_by_name($consulta,':vp_ebuzon',$json[0]->EBUZON);
		oci_bind_by_name($consulta,':vp_cbotiquin',$json[0]->CBOTIQUIN);
		oci_bind_by_name($consulta,':vp_ebotiquin',$json[0]->EBOTIQUIN);
		oci_bind_by_name($consulta,':vp_ccamilla',$json[0]->CCAMILLA);
		oci_bind_by_name($consulta,':vp_ecamilla',$json[0]->ECAMILLA);
		oci_bind_by_name($consulta,':vp_cextintor',$json[0]->CEXTINTOR);
		oci_bind_by_name($consulta,':vp_eextintor',$json[0]->EEXTINTOR);
		oci_bind_by_name($consulta,':vp_cavisoc',$json[0]->CAVISOC);
		oci_bind_by_name($consulta,':vp_eavisoc',$json[0]->EAVISOC);
		oci_bind_by_name($consulta,':vp_cavisof',$json[0]->CAVISOF);
		oci_bind_by_name($consulta,':vp_eavisof',$json[0]->EAVISOF);
		oci_bind_by_name($consulta,':vp_csenalizacion',$json[0]->CSENALIZACION);
		oci_bind_by_name($consulta,':vp_esenalizacion',$json[0]->ESENALIZACION);
		oci_bind_by_name($consulta,':vp_cformato',$json[0]->CFORMATO);
		oci_bind_by_name($consulta,':vp_eformato',$json[0]->EFORMATO);
		oci_bind_by_name($consulta,':vp_cavisoa',$json[0]->CAVISOA);
		oci_bind_by_name($consulta,':vp_eavisoa',$json[0]->EAVISOA);
		oci_bind_by_name($consulta,':vp_ctelevisor',$json[0]->CTELEVISOR);
		oci_bind_by_name($consulta,':vp_etelevisor',$json[0]->ETELEVISOR);
		oci_bind_by_name($consulta,':vp_cdispensador',$json[0]->CDISPENSADOR);
		oci_bind_by_name($consulta,':vp_edispensador',$json[0]->EDISPENSADOR);
		oci_bind_by_name($consulta,':vp_cavisos',$json[0]->CAVISOS);
		oci_bind_by_name($consulta,':vp_eavisos',$json[0]->EAVISOS);		
		oci_bind_by_name($consulta,':vp_cmarcacion',$json[0]->CMARCACION);
		oci_bind_by_name($consulta,':vp_emarcacion',$json[0]->EMARCACION);
		oci_bind_by_name($consulta,':vp_cmision',$json[0]->CMISION);
		oci_bind_by_name($consulta,':vp_emision',$json[0]->EMISION);
		oci_bind_by_name($consulta,':vp_creglamento',$json[0]->CREGLAMENTO);
		oci_bind_by_name($consulta,':vp_ereglamento',$json[0]->EREGLAMENTO);
		oci_bind_by_name($consulta,':vp_cbanio',$json[0]->CBANIO);
		oci_bind_by_name($consulta,':vp_ebanio',$json[0]->EBANIO);
		oci_bind_by_name($consulta,':vp_crampa',$json[0]->CRAMPA);
		oci_bind_by_name($consulta,':vp_erampa',$json[0]->ERAMPA);
		oci_bind_by_name($consulta,':vp_cestante',$json[0]->CESTANTE);
		oci_bind_by_name($consulta,':vp_eestante',$json[0]->EESTANTE);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':vp_res', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        $json = $clob->read($clob->size());
        echo $json;
        oci_close($c);		
	}
	//////////////////////////OBTENER Historico ADJUNTOS///////////////////////
	function ObtenerHistorico_Detalle(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$seccional = $request->seccional;
		$con = $request->con;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ADM.P_OBTENER_ARCHIVOS_HISTORIAL_DETALLE(:vp_seccional,:vp_con,:v_json_row); end;');
		oci_bind_by_name($consulta,':vp_seccional',$seccional);
		oci_bind_by_name($consulta,':vp_con',$con);
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

	function ObtenerHistorico_Implementos(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$seccional = $request->seccional;
		$con = $request->con;
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ADM.P_OBTENER_ARCHIVOS_HISTORIAL_IMPLEMENTOS(:vp_seccional,:vp_con,:v_json_row); end;');
		oci_bind_by_name($consulta,':vp_seccional',$seccional);
		oci_bind_by_name($consulta,':vp_con',$con);
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
////////////////////////SUBIR ADJUNTOS////////////////////////////////
	function adjuntararchivos(){
		require_once('../config/dbcon_prod.php');
		global $request;
		$seccional = $request->seccional;
		$con = $request->con;
		$tipoarchivo = $request->tipoarchivo;
		$url = $request->url;
		$hoy=date("d/m/Y");
		$consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ADM.P_ADJUNTAR_ARCHIVOS(:vp_seccional,:vp_con,:vp_tipoarchivo,:vp_url,:vp_fecha,:vp_resp,:vp_json_row); end;');
		oci_bind_by_name($consulta,':vp_seccional',$seccional);
		oci_bind_by_name($consulta,':vp_con',$con);
		oci_bind_by_name($consulta,':vp_tipoarchivo',$tipoarchivo);
		oci_bind_by_name($consulta,':vp_url',$url);
		oci_bind_by_name($consulta,':vp_fecha',$hoy);
		oci_bind_by_name($consulta,':vp_resp', $_SESSION['cedula']);
		$clob = oci_new_descriptor($c,OCI_D_LOB);
		oci_bind_by_name($consulta, ':vp_json_row', $clob,-1,OCI_B_CLOB);
		oci_execute($consulta,OCI_DEFAULT);
		$json = $clob->read($clob->size());
		echo $json;
		oci_close($c);		
	}
	
//////////////////////////OBTENER ADJUNTOS AÑO///////////////////////
function ObtenerAdjuntosAnio(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$seccional = $request->seccional;
	$con = $request->con;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ADM.P_OBTENER_ADJUNTOS_ANIO(:vp_seccional,:vp_con,:v_json_row); end;');
	oci_bind_by_name($consulta,':vp_seccional',$seccional);
	oci_bind_by_name($consulta,':vp_con',$con);
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
//////////////////////////OBTENER ADJUNTOS MES///////////////////////
function ObtenerAdjuntosMes(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$seccional = $request->seccional;
	$con = $request->con;
	$anio = $request->anio;
	$tipo = $request->tipo;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ADM.P_OBTENER_ADJUNTOS_MES(:vp_seccional,:vp_con,:vp_anio,:vp_tipo,:v_json_row); end;');
	oci_bind_by_name($consulta,':vp_seccional',$seccional);
	oci_bind_by_name($consulta,':vp_con',$con);
	oci_bind_by_name($consulta,':vp_anio',$anio);
	oci_bind_by_name($consulta,':vp_tipo',$tipo);
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
//////////////////////////OBTENER ADJUNTOS DIA///////////////////////
function ObtenerAdjuntosDia(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$seccional = $request->seccional;
	$con = $request->con;
	$anio = $request->anio;
	$tipo = $request->tipo;
	$mes = $request->mes;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ADM.P_OBTENER_ADJUNTOS_DIA(:vp_seccional,:vp_con,:vp_anio,:vp_tipo,:vp_mes,:v_json_row); end;');
	oci_bind_by_name($consulta,':vp_seccional',$seccional);
	oci_bind_by_name($consulta,':vp_con',$con);
	oci_bind_by_name($consulta,':vp_anio',$anio);
	oci_bind_by_name($consulta,':vp_tipo',$tipo);
	oci_bind_by_name($consulta,':vp_mes',$mes);
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




	/////////////////////Subir archivo a FTP//////////////////////////
function subir(){
	require_once('../config/dbcon.php');
	require_once('../config/ftpcon.php');
	require_once('../upload_file/subir_archivo.php');
	global $request;
	$seccional= $request->seccional;
	$archivobase= $request->archivobase;
	$ext= $request->ext;
	$hoy = date('dmY');
	$path= $request->path.'/'.$hoy.'/';
	$subio = subirArchivoFTP($archivobase,$path,$seccional,$ext);
	if ($subio != '0 - Error'){
		echo $subio;
	} else {
		echo 0;
	}
}

function actualizarfvencimiento(){
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c,'BEGIN PQ_GENESIS_GESTION_ADM.F_ACTUALIZAR_FVENCIMIENTO(:v_json,:v_cantidad,:v_json_row); end;');
	oci_bind_by_name($consulta,':v_json',$request->FECHAS);
	oci_bind_by_name($consulta,':v_cantidad',$request->cantidad);
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