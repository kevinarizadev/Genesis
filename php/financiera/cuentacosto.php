<?php
        $postdata = file_get_contents("php://input");
        // error_reporting(0);
        $request = json_decode($postdata);
        $function = $request->function;
        $function();


        // function visualizarcampos(){
        //     require_once('../config/dbcon_prod.php');
        //     global $request;  
        //     $consulta = oci_parse($c, 'begin PQ_GENESIS_INICIO.P_OBTENER_CANTIDADES_GESTION_NO_CONTRATADA (:v_pjson_row); end;');
        //     $clob = oci_new_descriptor($c, OCI_D_LOB);
        //     oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
        //     oci_execute($consulta, OCI_DEFAULT);
        //     $json = $clob->read($clob->size());
        //     echo $json;
        //     oci_close($c);
        //   }


        function agregarcuenta(){
            require_once('../config/dbcon_prod.php');
            global $request;
          
            $regimen = $request->regimen;
            $clasecontrato = $request->clasecontrato;
            $nivelatencion = $request->nivelatencion;
            $clasificacion = $request->clasificacion;
            $publico = $request->publico;
            $ambito = $request->ambito;
            $cubrimiento = $request->cubrimiento;
            $motivo = $request->motivo;
            $tipodoc = $request->tipodoc;
            $numdoc = $request->numdoc;
            $ubidoc = $request->ubidoc;
            $cuenta = $request->cuenta;
            $cuentatutela = $request->cuentatutela;
            $cuentactc = $request->cuentactc;
            $consecutivo = $request->consecutivo;


            $consulta = oci_parse($c, 'begin PQ_GENESIS_FINANCIERA.P_ACTUA_PARAMETRIZACION_EPCU(:v_pregimen,
                                                                                                :v_pclase_contrato,
                                                                                                :v_pnivel_atencion,
                                                                                                :v_pclasificacion,
                                                                                                :v_ppublico,
                                                                                                :v_pambito,
                                                                                                :v_pcubrimiento,
                                                                                                :v_pmotivo,
                                                                                                :v_pdocumento,
                                                                                                :v_pnumero,
                                                                                                :v_pubicacion,
                                                                                                :v_pcuenta,
                                                                                                :v_pcuenta_t,
                                                                                                :v_pcuenta_c,
                                                                                                :v_pconsecutivo,
                                                                                                :v_pjson_row ); end;');
            oci_bind_by_name($consulta, ':v_pregimen', $regimen);
            oci_bind_by_name($consulta, ':v_pclase_contrato', $clasecontrato);
            oci_bind_by_name($consulta, ':v_pnivel_atencion', $nivelatencion);
            oci_bind_by_name($consulta, ':v_pclasificacion', $clasificacion);
            oci_bind_by_name($consulta, ':v_ppublico', $publico);
              oci_bind_by_name($consulta, ':v_pambito', $ambito);
            oci_bind_by_name($consulta, ':v_pcubrimiento', $cubrimiento);
            oci_bind_by_name($consulta, ':v_pmotivo', $motivo);
            oci_bind_by_name($consulta, ':v_pdocumento', $tipodoc);
            oci_bind_by_name($consulta, ':v_pnumero', $numdoc);
            oci_bind_by_name($consulta, ':v_pubicacion', $ubidoc);
            oci_bind_by_name($consulta, ':v_pcuenta', $cuenta);
            oci_bind_by_name($consulta, ':v_pcuenta_t', $cuentatutela);
            oci_bind_by_name($consulta, ':v_pcuenta_c', $cuentactc);
            oci_bind_by_name($consulta, ':v_pconsecutivo', $consecutivo);

            $clob = oci_new_descriptor($c, OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
            oci_execute($consulta, OCI_DEFAULT);
            $json = $clob->read($clob->size());
            echo $json;
            oci_close($c);
          }


        function visualizardatos(){
            require_once('../config/dbcon_prod.php');
            global $request;  
            $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FINANCIERA.P_LISTA_PARAMETRIZACION_EPCU (:v_pestado,:v_pjson_row); end;');
            oci_bind_by_name($consulta, ':v_pestado', $request->estado);
            $clob = oci_new_descriptor($c, OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
            oci_execute($consulta, OCI_DEFAULT);
            $json = $clob->read($clob->size());
            echo $json;
            oci_close($c);
          }

          function obtenercantidades(){
            require_once('../config/dbcon_prod.php');
            global $request;  
            $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_FINANCIERA.P_OBTENER_CANTIDADES_GESTION (:v_pjson_row); end;');
            $clob = oci_new_descriptor($c, OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_pjson_row', $clob, -1, OCI_B_CLOB);
            oci_execute($consulta, OCI_DEFAULT);
            $json = $clob->read($clob->size());
            echo $json;
            oci_close($c);
          }
          

 ?>