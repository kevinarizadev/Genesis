<?php
    header("Content-Type: text/html;charset=utf-8");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST,  PUT, DELETE");
    header("Allow: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Content-Type: text/html;charset=utf-8");
    $postdata = file_get_contents("php://input");
    error_reporting(0);
    $request = json_decode($postdata);
    $headers = apache_request_headers();
    $token_domedical = "UGxsZGtkaU1ETURKU0ZEb3NkYWo4MzczNzM9PWRkOQ==";
    $token_sikuani = "tokenprueba";
    $token_susalud = "a2Rta2RzR0RGRkR2a2RmbnZrRFZGRCQ9JDkyOTk5==";

    $Authorization = $headers["Authorization"];
    $Tipotoken = explode(" ",$Authorization)[0];
    $Token = explode(" ",$Authorization)[1];
    if($Tipotoken == "Bearer"){
        $Nit = $request->Nit;
        $valid = "NO";
        if ($Nit == "900665934") {
            if ($token_domedical == $Token) {
                $valid = "SI";
            }
        }
        if ($Nit == "830512772") {
            //if ($token_sikuani == $Token) {
                $valid = "SI";
            //}

        }
        if ($Nit == "900008753") {
            if ($token_susalud == $Token) {
                $valid = "SI";
            }
        }
        if($valid == "SI"){
            $IdEntrega = $request->IdEntrega;
            $TipoDocumento = $request->TipoDocumento;
            $Documento = $request->Documento;
            $CodMedicamento = $request->CodMedicamento;
            $NomMedicamento = $request->NomMedicamento;
            $CantSolicitada = $request->CantSolicitada;
            $CantEntregada = $request->CantEntregada;
            $FechaEntrega = $request->FechaEntrega;
            $CelAfiliado = $request->CelAfiliado;
            $DirAfiliado = $request->DirAfiliado;
            $Modalidad = $request->Modalidad;
            require_once('config/dbcon_prod.php');
            $consulta = oci_parse($c,'BEGIN pq_genesis_medicamentos.P_I_INSERTA_ENTREGA(:v_p_id_entrega,
                                                                                    :v_ptercero,
                                                                                    :v_ptipo_doc,
                                                                                    :v_pdocumento,
                                                                                    :v_pcod_medicamento,
                                                                                    :v_pdescripcion,
                                                                                    :v_pcantidad_solicitada,
                                                                                    :v_pcantidad_entregada,
                                                                                    :v_pfecha_entrega,
                                                                                    :v_pcontacto,
                                                                                    :v_pdireccion,
                                                                                    :v_pmodalidad,
                                                                                    :v_json_row); end;');
            oci_bind_by_name($consulta,':v_p_id_entrega',$IdEntrega);
            oci_bind_by_name($consulta,':v_ptercero',$Nit);
            oci_bind_by_name($consulta,':v_ptipo_doc',$TipoDocumento);
            oci_bind_by_name($consulta,':v_pdocumento',$Documento);
            oci_bind_by_name($consulta,':v_pcod_medicamento',$CodMedicamento);
            oci_bind_by_name($consulta,':v_pdescripcion',$NomMedicamento);
            oci_bind_by_name($consulta,':v_pcantidad_solicitada',$CantSolicitada);
            oci_bind_by_name($consulta,':v_pcantidad_entregada',$CantEntregada);
            oci_bind_by_name($consulta,':v_pfecha_entrega',$FechaEntrega);
            oci_bind_by_name($consulta,':v_pcontacto',$CelAfiliado);
            oci_bind_by_name($consulta,':v_pdireccion',$DirAfiliado);
            oci_bind_by_name($consulta,':v_pmodalidad',$Modalidad);

            $clob = oci_new_descriptor($c,OCI_D_LOB);
            oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
            oci_execute($consulta,OCI_DEFAULT);
            if (isset($clob)) {
                $json = $clob->read($clob->size());
                echo $json;
            }else{
                echo '{"Codigo":1,"Nombre":"Error al registrar la entrega"}';
            }
            oci_close($c);
        }else{
            echo '{"Codigo":1,"Nombre":"Token Invaldo '.$Authorization.'"}';
        }
    }else{
        echo '{"Codigo":1,"Nombre":"La peticion no cumple con los estandares definidos"}';
    }

?>