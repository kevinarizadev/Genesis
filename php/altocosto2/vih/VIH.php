<?php
Session_Start();
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();

    function BuscarAfiliado(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        $tipodoc = $request->tipodoc;
        $cedula =$request->cedula;  
        $res=273;   
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CAC_ORI.P_OBTENER_DATOS_BASICOS(:v_ptipodocumento,:v_pdocumento,:v_presolucion,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_ptipodocumento',$tipodoc);
        oci_bind_by_name($consulta,':v_pdocumento',$cedula);
        oci_bind_by_name($consulta,':v_presolucion',$res);
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

    function ObtenerVariables(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        $empresa =$request->empresa;
        $tipodoc = $request->tipodoc;       
        $cedula =$request->cedula;
        // $cedula = 1000774553;
        $res=273;   
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CAC_ORI.P_OBTENER_DATOS_CAC(:v_pempresa,:v_ptipodocumento,:v_pdocumento,:v_presolucion,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pempresa',$empresa);
        oci_bind_by_name($consulta,':v_ptipodocumento',$tipodoc);
        oci_bind_by_name($consulta,':v_pdocumento',$cedula);
        oci_bind_by_name($consulta,':v_presolucion',$res);
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

    function ObtenerMedicamentos(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        $coincidencia =$request->coincidencia;
        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CAC_ORI.P_OBTENER_CUM(:v_pcoincidencia,:v_json_row); end;');
        oci_bind_by_name($consulta,':v_pcoincidencia',$coincidencia);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json = $clob->read($clob->size());
            echo '['.$json.']';
        }else{
            echo 0;
        }
        oci_close($c);
    }

    function InsertarDatos(){
        require_once('../../config/dbcon_prod.php');
        global $request;
        $v_pjson=$request->v_pjson;
        $v_parea=$request->v_parea;     
        $consulta = oci_parse($c,'begin PQ_GENESIS_CAC_ORI.P_INSERTA_CAC_VIH(:v_pjson,:v_parea,:v_json_row,:v_pvalidacion); end;');
        oci_bind_by_name($consulta,':v_pjson',$v_pjson);
        oci_bind_by_name($consulta,':v_parea',$v_parea);
        oci_bind_by_name($consulta,':v_pvalidacion',$validacion,50);
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta, ':v_json_row', $clob,-1,OCI_B_CLOB);
        oci_execute($consulta,OCI_DEFAULT);
        if (isset($clob)) {
            $json2 = $clob->read($clob->size());
            echo '['.$json2.',{ "validacion":'.$validacion.'}]';
        }else{
            $num = 0;
            echo '[{"dato":'.$num.'},{ "validacion":'.$validacion.'}]';
        }
            oci_close($c);
    }







    function subir(){

        require_once('../../config/dbcon.php');

        require_once('../../config/ftpcon.php');

        include('../../upload_file/subir_archivo.php');

        global $request;

        $nomadj= $request->nomadj;

        $file= $request->BaseArchivo;

        $ext= $request->ext;

        $cedula = $request->cedula;

        $tipo= $request->tipo;

        $path = '/cargue_ftp/Digitalizacion/Genesis/CAC/0273/';

        $path2 = '/cargue_ftp/Digitalizacion/Genesis/CAC/0273/'.$cedula.'/';

        $path3 = '/cargue_ftp/Digitalizacion/Genesis/CAC/0273/'.$cedula.'/'.$tipo.'/';



        $db_name = $path3.$nomadj.'.'.$ext;

        $tmpfile = $nomadj.'.'.$ext;

        list(, $file) = explode(';', $file);

        list(, $file) = explode(',', $file);

        $file = base64_decode($file);

        file_put_contents($tmpfile, $file);

        

        if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path) == TRUE) {

            if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path2) == TRUE) {

                if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path3) == TRUE) {

                    $subio=ftp_put($con_id, $path3.'/'.$tmpfile, $tmpfile, FTP_BINARY); 

                    if ($subio) {

                        unlink($tmpfile);

                        echo $db_name;

                    }else{

                        unlink($tmpfile);

                        echo '0 - Error';

                    }

                }else{

                    ftp_mkdir($con_id, $path3);

                    $subio=ftp_put($con_id, $path3.'/'.$tmpfile, $tmpfile, FTP_BINARY);

                    if ($subio) {

                        unlink($tmpfile);

                        echo $db_name;

                    }else{

                        unlink($tmpfile);

                        echo '0 - Error';

                    }

                }

            }else{

                ftp_mkdir($con_id, $path2);

                if (is_dir('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$path3) == TRUE) {

                    $subio=ftp_put($con_id, $path3.'/'.$tmpfile, $tmpfile, FTP_BINARY);     

                    if ($subio) {

                        unlink($tmpfile);

                        echo $db_name;

                    }else{

                        unlink($tmpfile);

                        echo '0 - Error';

                    }           

                }else{

                    ftp_mkdir($con_id, $path3);

                    $subio=ftp_put($con_id, $path3.'/'.$tmpfile, $tmpfile, FTP_BINARY);

                    if ($subio) {

                        unlink($tmpfile);

                        echo $db_name;

                    }else{

                        unlink($tmpfile);

                        echo '0 - Error';

                    }

                }

            }





            

        ftp_close($con_id);

        }

    }





    function obtenercodigo(){

        echo $_SESSION['codmunicipio'];

    }



    

    function InformeSecc(){

        require_once('../../config/dbcon_prod.php');

        global $request;    

        $consulta = oci_parse($c,'BEGIN PQ_GENESIS_CAC_ORI.p_informe_seccional(:v_pjson_row); end;');

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



?>