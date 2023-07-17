<?php
    header("Content-Type: text/html;charset=utf-8");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST,  PUT, DELETE");
    header("Allow: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Content-Type: text/html;charset=utf-8");
    $postdata = file_get_contents("php://input");
    //error_reporting(0);
    $request = json_decode($postdata);

    //file_put_contents('api.json', json_encode($request));
    //exit;
            $Nit = $request->Nit;
            $IdEntrega = $request->IdEntrega;
            $TipoDocumento = $request->TipoDocumento;
            $Documento = $request->Documento;
            $CodMedicamento = $request->CodMedicamento;
            $NomMedicamento = $request->NomMedicamento;
            $CantSolicitada = $request->CantSolicitadaTotal;
            $CantEntregada = $request->CantEntregada;
            $CantPrescrita = $request->CantPrescrita;
            $FechaEntrega = $request->FechaEntrega;
            $CelAfiliado = $request->CelAfiliado;
            $DirAfiliado = $request->DirAfiliado;
            $Modalidad = $request->Modalidad;
            $NomAfiliado = $request->NomAfiliado;
            $ApeAfiliado = $request->ApeAfiliado;
            $Genero = $request->Genero;
            $Edad = $request->Edad;
            $Ciudad = $request->Ciudad;
            $Departamento = $request->Departamento;
            $ViaAdministracion = $request->ViaAdministracion;
            $Frecuencia = $request->Frecuencia;
            $DurTratamiento = $request->DurTratamiento;
            $Lote = $request->Lote;
            $FechaVencimiento = $request->FechaVencimiento;
            $DxPrincipal = $request->DxPrincipal;
            //$NomDxPrincipal = $request->NomDxPrincipal;
            $FecPrescripcion = $request->FecPrescripcion;
            $FecAutorizacion = $request->FecAutorizacion;
            $NumFormula = $request->NumFormula;
            $AutDomicilio = $request->AutDomicilio;
            $EntDomicilio = $request->EntDomicilio;
            $CodigoAtc = $request->CodigoAtc;


            require_once('config/dbcon_prod.php');
            $consulta = oci_parse($c,'BEGIN pq_genesis_medicamentos.P_I_INSERTA_ENTREGA_2(:v_p_id_entrega,
                                                                                          :v_ptercero,
                                                                                          :v_ptipo_doc,
                                                                                          :v_pdocumento,
                                                                                          :v_pcod_medicamento,
                                                                                          :v_pdescripcion,
                                                                                          :v_pcantidad_solicitada,
                                                                                          :v_pcantidad_entregada,
                                                                                          :v_pcantidad_prescrita,
                                                                                          :v_pfecha_entrega,
                                                                                          :v_pcontacto,
                                                                                          :v_pdireccion,
                                                                                          :v_pmodalidad,
                                                                                          :v_pnombres,
                                                                                          :v_papellidos,
                                                                                          :v_pgenero,
                                                                                          :v_pedad,
                                                                                          :v_pciudad,
                                                                                          :v_pdepartamento,
                                                                                          :v_pvia_administracion,
                                                                                          :v_pfrecuencia,
                                                                                          :v_pduracion_tratamiento,
                                                                                          :v_plote,
                                                                                          :v_pfecha_vencimiento,
                                                                                          :v_pdx_principal,
                                                                                          :v_pfecha_prescripcion,
                                                                                          :v_pfecha_autorizacion,
                                                                                          :v_pnumero_formula,
                                                                                          :v_pautoriza_domicilio,
                                                                                          :v_pentrega_domicilio,
                                                                                          :v_pcodigo_atc,
                                                                                          :v_json_row); end;');
            oci_bind_by_name($consulta,':v_p_id_entrega',$IdEntrega);
            oci_bind_by_name($consulta,':v_ptercero',$Nit);
            oci_bind_by_name($consulta,':v_ptipo_doc',$TipoDocumento);
            oci_bind_by_name($consulta,':v_pdocumento',$Documento);
            oci_bind_by_name($consulta,':v_pcod_medicamento',$CodMedicamento);
            oci_bind_by_name($consulta,':v_pdescripcion',$NomMedicamento);
            oci_bind_by_name($consulta,':v_pcantidad_solicitada',$CantSolicitada);
            oci_bind_by_name($consulta,':v_pcantidad_entregada',$CantEntregada);
            oci_bind_by_name($consulta,':v_pcantidad_prescrita',$CantPrescrita);
            oci_bind_by_name($consulta,':v_pfecha_entrega',$FechaEntrega);
            oci_bind_by_name($consulta,':v_pcontacto',$CelAfiliado);
            oci_bind_by_name($consulta,':v_pdireccion',$DirAfiliado);
            oci_bind_by_name($consulta,':v_pmodalidad',$Modalidad);
            oci_bind_by_name($consulta,':v_pnombres',$NomAfiliado);
            oci_bind_by_name($consulta,':v_papellidos',$ApeAfiliado);
            oci_bind_by_name($consulta,':v_pgenero',$Genero);
            oci_bind_by_name($consulta,':v_pedad',$Edad);
            oci_bind_by_name($consulta,':v_pciudad',$Ciudad);
            oci_bind_by_name($consulta,':v_pdepartamento',$Departamento);
            oci_bind_by_name($consulta,':v_pvia_administracion',$ViaAdministracion);
            oci_bind_by_name($consulta,':v_pfrecuencia',$Frecuencia);
            oci_bind_by_name($consulta,':v_pduracion_tratamiento',$DurTratamiento);
            oci_bind_by_name($consulta,':v_plote',$Lote);
            oci_bind_by_name($consulta,':v_pfecha_vencimiento',$FechaVencimiento);
            oci_bind_by_name($consulta,':v_pdx_principal',$DxPrincipal);
            oci_bind_by_name($consulta,':v_pfecha_prescripcion',$FecPrescripcion);
            oci_bind_by_name($consulta,':v_pfecha_autorizacion',$FecAutorizacion);
            oci_bind_by_name($consulta,':v_pnumero_formula',$NumFormula);
            oci_bind_by_name($consulta,':v_pautoriza_domicilio',$AutDomicilio);
            oci_bind_by_name($consulta,':v_pentrega_domicilio',$EntDomicilio);
            oci_bind_by_name($consulta,':v_pcodigo_atc',$CodigoAtc);

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
    
?>
