<?php
        $postdata = file_get_contents("php://input");
        // error_reporting(0);
        $request = json_decode($postdata);
        $function = $request->function;
        $function();



        function P_i_inserta_plan_contigencia(){
            require_once('../config/dbcon_prod.php');
            global $request;
            $ubicacion = $request->ubicacion;
            $fecha = $request->fecha;
            $poblaciontotal = $request->poblaciontotal;
            $poblacion9 = $request->poblacion9;
            $poblacion10 = $request->poblacion10;
            $poblacion60 = $request->poblacion60;
            $recurso_contencion = $request->recurso_contencion;
            $valor_contencion = $request->valor_contencion;
            $recurso_ejecutado = $request->recurso_ejecutado;
            $numero_equipos = $request->numero_equipos;
            $visitas_domiciliaria = $request->visitas_domiciliaria;
            $operadores_atencion = $request->operadores_atencion;
            $llamadas_atendidas = $request->llamadas_atendidas;
            $llamadas_abandonadas = $request->llamadas_abandonadas;
            $muestras_tomadas = $request->muestras_tomadas;
            $muestras_positivas = $request->muestras_positivas;
            $llamadas_seguimiento = $request->llamadas_seguimiento;
            $casos_positivos = $request->casos_positivos;
            $casos_sospechosos = $request->casos_sospechosos;
            $pacientes_hospitalizados = $request->pacientes_hospitalizados;
            $pacientes_fallecidos = $request->pacientes_fallecidos;
            $preguntas_no_diligenciadas = $request->preguntas_no_diligenciadas;
            $preguntas_no_aplican = $request->preguntas_no_aplican;
            $responsable = $request->responsable;
            $area_responsable = $request->area_responsable;

            

            $consulta = oci_parse($c, 'begin PQ_GENESIS_COVID19.P_I_INSERTA_PLAN_CONTIGENCIA(:v_pUBICACION,
                                                                                            :v_pFECHA,
                                                                                            :v_pPOBLACION_TOTAL,
                                                                                            :v_pPOBLACION_0_9,
                                                                                            :v_pPOBLACION_10_59,
                                                                                            :v_pPOBLACION_60,
                                                                                            :v_pRECURSO_CONTENCION,
                                                                                            :v_pVALOR_CONTENCION,
                                                                                            :v_pRECURSO_EJECUTADO,
                                                                                            :v_pNUMERO_EQUIPOS,
                                                                                            :v_pVISITAS_DOMICILIARIA,
                                                                                            :v_pOPERADORES_ATENCION,
                                                                                            :v_pLLAMADAS_ATENDIDAS,
                                                                                            :v_pLLAMADAS_ABANDONADAS,
                                                                                            :v_pMUESTRAS_TOMADAS,
                                                                                            :v_pMUESTRAS_POSITIVAS,
                                                                                            :v_pLLAMADAS_SEGUIMIENTO,
                                                                                            :v_pCASOS_POSITIVOS,
                                                                                            :v_pCASOS_SOSPECHOSOS,
                                                                                            :v_pPACIENTES_HOSPITALIZADOS,
                                                                                            :v_pPACIENTES_FALLECIDOS,
                                                                                            :v_pPREGUNTAS_NO_DILIGENCIADAS,
                                                                                            :v_pPREGUNTAS_NO_APLICAN,
                                                                                            :v_pResponsable,
                                                                                            :v_pareaResponsable,
                                                                                            :v_pjson_out ); end;');

            oci_bind_by_name($consulta, ':v_pUBICACION', $ubicacion);
            oci_bind_by_name($consulta, ':v_pFECHA', $fecha);
            oci_bind_by_name($consulta, ':v_pPOBLACION_TOTAL', $poblaciontotal);
            oci_bind_by_name($consulta, ':v_pPOBLACION_0_9', $poblacion9);
            oci_bind_by_name($consulta, ':v_pPOBLACION_10_59', $poblacion10);
            oci_bind_by_name($consulta, ':v_pPOBLACION_60', $poblacion60);
            oci_bind_by_name($consulta, ':v_pRECURSO_CONTENCION', $recurso_contencion);
            oci_bind_by_name($consulta, ':v_pVALOR_CONTENCION', $valor_contencion);
            oci_bind_by_name($consulta, ':v_pRECURSO_EJECUTADO', $recurso_ejecutado);
            oci_bind_by_name($consulta, ':v_pNUMERO_EQUIPOS', $numero_equipos);
            oci_bind_by_name($consulta, ':v_pVISITAS_DOMICILIARIA', $visitas_domiciliaria);
            oci_bind_by_name($consulta, ':v_pOPERADORES_ATENCION', $operadores_atencion);
            oci_bind_by_name($consulta, ':v_pLLAMADAS_ATENDIDAS', $llamadas_atendidas);
            oci_bind_by_name($consulta, ':v_pLLAMADAS_ABANDONADAS', $llamadas_abandonadas);
            oci_bind_by_name($consulta, ':v_pMUESTRAS_TOMADAS', $muestras_tomadas);
            oci_bind_by_name($consulta, ':v_pMUESTRAS_POSITIVAS', $muestras_positivas);
            oci_bind_by_name($consulta, ':v_pLLAMADAS_SEGUIMIENTO', $llamadas_seguimiento);
            oci_bind_by_name($consulta, ':v_pCASOS_POSITIVOS', $casos_positivos);
            oci_bind_by_name($consulta, ':v_pCASOS_SOSPECHOSOS', $casos_sospechosos);
            oci_bind_by_name($consulta, ':v_pPACIENTES_HOSPITALIZADOS', $pacientes_hospitalizados);
            oci_bind_by_name($consulta, ':v_pPACIENTES_FALLECIDOS', $pacientes_fallecidos);
            oci_bind_by_name($consulta, ':v_pPREGUNTAS_NO_DILIGENCIADAS', $preguntas_no_diligenciadas);
            oci_bind_by_name($consulta, ':v_pPREGUNTAS_NO_APLICAN', $preguntas_no_aplican);
            oci_bind_by_name($consulta, ':v_pResponsable', $responsable);
            oci_bind_by_name($consulta, ':v_pareaResponsable', $area_responsable);
            
            $clob = oci_new_descriptor($c, OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
            oci_execute($consulta, OCI_DEFAULT);
            $json = $clob->read($clob->size());
            echo $json;
            oci_close($c);
          }


          function P_OBTENER_PLAN_CONTINGENCIA(){
            require_once('../config/dbcon_prod.php');
            global $request;  
            $ubicacionv = $request->ubicacionv;
            $fechav = $request->fechav;
          
            $consulta = oci_parse($c, 'begin PQ_GENESIS_COVID19.P_OBTENER_PLAN_CONTINGENCIA(:v_pUBICACION,
                                                                                            :v_pFECHA,
                                                                                            :v_pjson_out); end;');

            oci_bind_by_name($consulta, ':v_pUBICACION', $ubicacionv);
            oci_bind_by_name($consulta, ':v_pFECHA', $fechav);
            $clob = oci_new_descriptor($c, OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
            oci_execute($consulta, OCI_DEFAULT);
            $json = $clob->read($clob->size());
            echo $json;
            oci_close($c);
          }

        //   function P_i_inserta_plan_contigencia(){
        //     require_once('../../config/dbcon_prod.php');
        //     global $request;
        //     $datos = $request->datos;
        //     $soporte = $request->adj;
        //     $len = $request->lenadjunto;
        //     $type = $request ->type;
        //     $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_COVID19.P_I_INSERTA_PLAN_CONTIGENCIA(:v_pjson_row_in,:v_pjson_row_adj,:v_len, :v_ptipo, :v_pjson_row_out); end;');
        //     $json_parametros = oci_new_descriptor($c, OCI_D_LOB);
        //     $json_sop = oci_new_descriptor($c, OCI_D_LOB);		
        //     oci_bind_by_name($consulta,':v_ptipo',$type);
        //     oci_bind_by_name($consulta,':v_len',$len);
        //     oci_bind_by_name($consulta, ':v_pjson_row_adj', $json_sop, -1, OCI_B_CLOB);
        //     $json_sop->writeTemporary($soporte);		
        //     oci_bind_by_name($consulta, ':v_pjson_row_in', $json_parametros, -1, OCI_B_CLOB);
        //     $json_parametros->writeTemporary($datos);
        //     $clob = oci_new_descriptor($c,OCI_D_LOB);
        //     oci_bind_by_name($consulta, ':v_pjson_row_out', $clob,-1,OCI_B_CLOB);
        //     oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        //     if (isset($clob)) {
        //         $json = $clob->read($clob->size());
        //         echo $json;
        //     }else{
        //         echo 0;
        //     }
        //     oci_close($c);
        // }

          

 ?>