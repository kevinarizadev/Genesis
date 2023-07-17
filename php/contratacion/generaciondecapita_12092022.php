<?php
        $postdata = file_get_contents("php://input");
        // error_reporting(0);
        $request = json_decode($postdata);
        $function = $request->function;
        $function();



        function crearperiodo(){
            require_once('../config/dbcon_prod.php');
            global $request;
            // $datos = json_decode($request->datos);
            // $periodo_cap = $datos->periodo_cap;
            // $fechainicio = $datos->fechainicio;
            // $fechafinal = $datos->fechafinal;
            // $responsable = $datos->responsable;
            $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_CREA_PERIODO(:v_per_capitacion,
                                                                                    :v_fec_inicio,
                                                                                    :v_fec_final ,
                                                                                    :v_cod_usuario,
                                                                                    :v_json_row); end;');
            oci_bind_by_name($consulta,':v_per_capitacion',$request->periodo_cap);
            oci_bind_by_name($consulta,':v_fec_inicio',$request->fechainicio);
            oci_bind_by_name($consulta,':v_fec_final',$request->fechafinal);
            oci_bind_by_name($consulta,':v_cod_usuario',$request->responsable);

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


        function generarcapita(){
            require_once('../config/dbcon_prod.php');
            global $request;
 
            $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_CREAR_MATRIZ(:v_periodo,
                                                                            :v_usuario,
                                                                            :v_json_row); end;');
            oci_bind_by_name($consulta,':v_periodo',$request->periodoc);
            oci_bind_by_name($consulta,':v_usuario',$request->usuarior);
         

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


    function obtenerconcepto(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_OBTENER_CONCEPTO (:v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

            echo 0;

        }
        oci_close($c);

        
    }


    function validarperiodo(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_VALIDA_PERIODO (:v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

            echo 0;

        }
        oci_close($c);

        
    }


    function vertabla(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_VALIDA_CAPITA(:v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

            echo 0;

        }
        oci_close($c);

        
    }

    function vertabla2(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_OBTENER_CIUDADES_UNI(:v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

            echo 0;

        }
        oci_close($c);

        
    }

    function cambiarestado(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $departamento = $request->departamento;
        $ciudad = $request->ciudad;
        $estado = $request->estado;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_U_CIUDADES_UNICAS( :v_depa,
                                                                            :v_ciudad,
                                                                            :v_estado,
                                                                            :v_pjson_row); end;');
        oci_bind_by_name($consulta,':v_depa',$departamento);          
        oci_bind_by_name($consulta,':v_ciudad',$ciudad);
        oci_bind_by_name($consulta,':v_estado',$estado);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

            echo 0;

        }
        oci_close($c);

        
    }

  

    function cargarmatriz(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $cargue_concepto = $request->cargue_concepto;
        $cargue_json = $request->cargue_json;
        $cargue_cantidad = $request->cargue_cantidad;

        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_UI_CONCEPTOS (  :v_concepto,
                                                                            :v_pjson_row_in,
                                                                            :v_cantidad,
                                                                            :v_pjson_row); end;');
        oci_bind_by_name($consulta,':v_concepto',$cargue_concepto);
        $jsonin = oci_new_descriptor($c, OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row_in', $jsonin, -1, OCI_B_CLOB);
        $jsonin->writeTemporary($cargue_json);
        oci_bind_by_name($consulta,':v_cantidad',$cargue_cantidad);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_pjson_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

            echo 0;

        }
        oci_close($c);

        
    }

  


    function estadodelperiodo(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_ESTADO_PERIODO (:v_periodo,
                                                                        :v_json_row); end;');
        
        oci_bind_by_name($consulta,':v_periodo',$request->estadoperiodo);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

            echo 0;

        }
        oci_close($c);

        
    }


    function estadocapita(){
        require_once('../config/dbcon_prod.php');
        global $request;
        $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_GC.P_ESTADO_CAPITA (:v_periodo,
                                                                        :v_json_row); end;');
        
        oci_bind_by_name($consulta,':v_periodo',$request->estadocapita);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_COMMIT_ON_SUCCESS);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo $json;
        }else{

            echo 0;

        }
        oci_close($c);

        
    }


    

        

    ?>