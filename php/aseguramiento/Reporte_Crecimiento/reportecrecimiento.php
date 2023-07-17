<?php 
ini_set('max_execution_time', 0);
header("Content-Type: text/html;charset=utf-8");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
error_reporting(0);
$function = $request->function;
$function();

    //LISTA ANNOS
function listaAnnos(){
    require_once('../../config/dbcon_cartera.php');
    global $request;
    if ($request->tipo_reporte == 'C') {
        $consulta = "SELECT DISTINCT YEAR(CONVERT(datetime, p.PERIODO_BRUTO, 103)) anno
        from CRECIMIENTO_BRUTO p;";
    }
    if ($request->tipo_reporte == 'TN') {
        $consulta = "SELECT DISTINCT YEAR(CONVERT(datetime, p.PERIODO_BRUTO, 103)) anno
        from GLOSA_NEG_CREC_BRUTO p;";
    }
    if ($request->tipo_reporte == 'RN') {
        $consulta = "SELECT distinct YEAR(CONVERT(datetime, NSFECHAPROCESO, 103)) anno
        from SOFTEPS.DBO.SUB_HISNS
        where NSFUENTE = 'EPS' AND NSRTA = 'VAL' order by 1 desc;";
    }
    $stmt=sqlsrv_query($conn,$consulta);
    $rows= array(); 
    if( $stmt === false) {  
        die( print_r( sqlsrv_errors(), true) ); 
    }   
    while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC))
    {
        $rows[] = $row;
    }
    echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);  
    sqlsrv_free_stmt( $stmt);   
    sqlsrv_close( $conn );  
}

    //LISTA MESES DEPENDIENDO DEL AÑO SELECCIONADO
function listaMeses(){
    require_once('../../config/dbcon_cartera.php');
    global $request;
    if ($request->tipo_reporte == 'C') {
        $consulta = "SELECT distinct MONTH(CONVERT(datetime, p.PERIODO_BRUTO, 103)) mes
        from CRECIMIENTO_BRUTO p
        where YEAR(CONVERT(datetime, p.PERIODO_BRUTO, 103)) = ?;";
    }
    if ($request->tipo_reporte == 'TN') {
        $consulta = "SELECT distinct MONTH(CONVERT(datetime, p.PERIODO_BRUTO, 103)) mes
        from GLOSA_NEG_CREC_BRUTO p
        where YEAR(CONVERT(datetime, p.PERIODO_BRUTO, 103)) = ?;";
    }
    if ($request->tipo_reporte == 'RN') {
        $consulta = "SELECT distinct MONTH(CONVERT(datetime, NSFECHAPROCESO, 103)) mes
        from SOFTEPS.DBO.SUB_HISNS
        where YEAR(CONVERT(datetime, NSFECHAPROCESO, 103)) = ? and NSFUENTE = 'EPS' AND NSRTA = 'VAL'
        order by 1 desc;";
    }
    $stmt=sqlsrv_query($conn,$consulta,array($request->anno));
    $rows= array(); 
    if( $stmt === false) {  
        die( print_r( sqlsrv_errors(), true) ); 
    }   
    while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC))
    {
        $rows[] = $row;
    }
    echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);  
    sqlsrv_free_stmt( $stmt);   
    sqlsrv_close( $conn );  
}

    //LISTA PERIODOS DISPONIBLES DEPENDIENDO DEL MES SELECCIONADO
function listaPeriodos(){
    require_once('../../config/dbcon_cartera.php');
    global $request;
    if ($request->tipo_reporte == 'C') {
        $consulta = "SELECT distinct p.PERIODO periodo
        from CRECIMIENTO_BRUTO p
        where YEAR(CONVERT(datetime, P.PERIODO_BRUTO, 103)) = ?
        and MONTH(CONVERT(datetime, P.PERIODO_BRUTO, 103)) = ?;";
    }
    if ($request->tipo_reporte == 'TN') {
        $consulta = "SELECT distinct p.PERIODO periodo
        from GLOSA_NEG_CREC_BRUTO p
        where YEAR(CONVERT(datetime, p.PERIODO_BRUTO, 103)) = ?
        and MONTH(CONVERT(datetime, p.PERIODO_BRUTO, 103)) = ?;";
    }
    $stmt=sqlsrv_query($conn,$consulta,array($request->anno,$request->mes));
    $rows= array(); 
    if( $stmt === false) {  
        die( print_r( sqlsrv_errors(), true) ); 
    }   
    while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC))
    {
        $rows[] = $row;
    }
    echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);  
    sqlsrv_free_stmt( $stmt);   
    sqlsrv_close( $conn );  
}

    
function rutasSoportes(){
    require_once('../../config/dbcon_cartera.php');
    require_once('../../config/dbcon_prod.php');
    require_once('../../config/ftpcon.php');
    global $request;
    $proceso = $request->proceso;
    $periodo = $request->periodo;
    $municipio = $request->municipio;
    $nombreTxt = uniqid();
    $cod_dpto = $_SESSION["codmunicipio"];
    //echo $_SESSION["codmunicipio"];

    if ($proceso == 'C') {
        $consultaRegistros = 'SELECT * from CRECIMIENTO_BRUTO
        where CRECIMIENTO_BRUTO.PERIODO = ?
        and YEAR(CONVERT(datetime, CRECIMIENTO_BRUTO.PERIODO_BRUTO, 103)) = ?
        and MONTH(CONVERT(datetime, CRECIMIENTO_BRUTO.PERIODO_BRUTO, 103)) = ? 
        and CRECIMIENTO_BRUTO.CODDPTO = ? and CRECIMIENTO_BRUTO.CODMUN = ?';
        $stmt=sqlsrv_query($conn,$consultaRegistros,array($request->periodo_s,$request->anno,$request->mes,$request->dpto,$request->municipio));
        $txtReporteCrecimiento = fopen("../../../temp/Reporte_Crecimiento_".$nombreTxt.".txt", "c+");
        $rutaTxtReporteCrecimiento = "../../../temp/Reporte_Crecimiento_".$nombreTxt.".txt";
        if( $stmt === false) { 
            die(print_r(sqlsrv_errors(), true)); 
        }
        fwrite($txtReporteCrecimiento, 'OBSERVACION' . '|' .
            'CODEPS' . '|' .
            'TDOC' . '|' .
            'DOC' . '|' .
            'PAPE' . '|' .
            'SAPE' . '|' .
            'PNOM' . '|' .
            'SNOM' . '|' .
            'FNAC' . '|' .
            'SEXO' . '|' .
            'CODDPTO' . '|' .
            'CODMUN' . '|' .
            'NOM_DPTO' . '|' .
            'NOM_MPIO' . '|' .
            'ZONA' . '|' .
            'FAFI' . '|' .
            'GPOB' . '|' .
            'NIVEL' . '|' .
            'TTRAS' . '|' .
            'PROCESO' . '|' .
            'CNS_BDUA' . '|' .
            'FICHA' . '|' .
            'DIRECCION' . '|' .
            'BARRIO' . '|' .
            'TELEFONO1' . '|' .
            'TELEFONO2' . '|' .
            'BLOQUEOS' . '|' .
            'PERIODO_BRUTO' . '|' .
            'TIPO_INGRESO_BRUTO' . '|' .
            'TIPO_INGRESO_EAFI' . '|' .
            'CARNETIZADO_EAFI' . '|' .
            'SOPORTE_GENESIS' . '|' . "\n");
        $arrayAfiliados = array();
        while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
            $insert =  oci_parse($c,"INSERT into doc_extraccion_soportes (afiliado,seccional,periodo,proceso)
                values (:v_afiliado,:v_seccional,:v_periodo,:v_proceso)");
            oci_bind_by_name($insert, ':v_afiliado', $row['DOC']);
            oci_bind_by_name($insert, ':v_seccional', $_SESSION["codmunicipio"]);
            oci_bind_by_name($insert, ':v_periodo', $periodo);
            oci_bind_by_name($insert, ':v_proceso', $proceso);
            oci_execute($insert,OCI_COMMIT_ON_SUCCESS);
            fwrite($txtReporteCrecimiento, $row['OBSERVACION'] . '|' .
                $row['CODEPS'] . '|' .
                $row['TDOC'] . '|' .
                $row['DOC'] . '|' .
                $row['PAPE'] . '|' .
                $row['SAPE'] . '|' .
                $row['PNOM'] . '|' .
                $row['SNOM'] . '|' .
                $row['FNAC'] . '|' .
                $row['SEXO'] . '|' .
                $row['CODDPTO'] . '|' .
                $row['CODMUN'] . '|' .
                $row['NOM_DPTO'] . '|' .
                $row['NOM_MPIO'] . '|' .
                $row['ZONA'] . '|' .
                $row['FAFI'] . '|' .
                $row['GPOB'] . '|' .
                $row['NIVEL'] . '|' .
                $row['TTRAS'] . '|' .
                $row['PROCESO'] . '|' .
                $row['CNS_BDUA'] . '|' .
                $row['FICHA'] . '|' .
                $row['DIRECCION'] . '|' .
                $row['BARRIO'] . '|' .
                $row['TELEFONO1'] . '|' .
                $row['TELEFONO2'] . '|' .
                $row['BLOQUEOS'] . '|' .
                $row['PERIODO_BRUTO'] . '|' .
                $row['TIPO_INGRESO_BRUTO'] . '|' .
                $row['TIPO_INGRESO_EAFI'] . '|' .
                $row['CARNETIZADO_EAFI'] . '|' .
                $row['SOPORTE_GENESIS'] . '|' . "\n");
            $arrayAfiliados[] = $row;
        }   
        
        $countAfiliados = count($arrayAfiliados);
        sqlsrv_free_stmt( $stmt); 
        sqlsrv_close( $conn ); 
    }

    if ($proceso == 'TN') {
        $consultaRegistros = "SELECT *
        from GLOSA_NEG_CREC_BRUTO p
        where p.PERIODO = ?
        and YEAR(CONVERT(datetime, p.PERIODO_BRUTO, 103)) = ?
        and MONTH(CONVERT(datetime, p.PERIODO_BRUTO, 103)) = ? 
        and p.CODDPTO = ? and p.CODMUN = ?;";
        $stmt=sqlsrv_query($conn,$consultaRegistros,array($request->periodo_s,$request->anno,$request->mes,$request->dpto,$request->municipio));
        $txtReporteTrasladosNegados = fopen("../../../temp/Reporte_Traslados_Negados_".$nombreTxt.".txt", "c+");
        $rutaTxtReporteTrasladosNegados = "../../../temp/Reporte_Traslados_Negados_".$nombreTxt.".txt";
        if( $stmt === false) { 
            die(print_r(sqlsrv_errors(), true)); 
        }
        fwrite($txtReporteTrasladosNegados, 'OBSERVACION' . '|' .
            'CODENTIDAD' . '|' .
            'TDOC' . '|' .
            'DOC' . '|' .
            'PAPE' . '|' .
            'SAPE' . '|' .
            'PNOM' . '|' .
            'SNOM' . '|' .
            'FNAC' . '|' .
            'SEXO' . '|' .
            'CODDPTO' . '|' .
            'CODMUN' . '|' .
            'NOM_DPTO' . '|' .
            'NOM_MPIO' . '|' .
            'ZONA' . '|' .
            'FAFIL' . '|' .
            'GPOB' . '|' .
            'NIVEL' . '|' .
            'TIPOTRASL' . '|' .
            'PROCESO' . '|' .
            'FICHA' . '|' .
            'DIRECCION' . '|' .
            'BARRIO' . '|' .
            'TELEFONO1' . '|' .
            'TELEFONO2' . '|' .
            'PERIODO_BRUTO' . '|' .
            'TIPO_INGRESO_BRUTO' . '|' .
            'TIPO_INGRESO_EAFI' . '|' .
            'CARNETIZADO_EAFI' . '|' .
            'SOPORTE_GENESIS' . '|' .
            'S5CODEPS' . '|' .
            'NOMBEPS' . '|' . "\n");
        $arrayAfiliados = array();
        while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
                // Se insertan las cedulas en la tabla doc_extraccion_soportes
            $insert =  oci_parse($c,"INSERT into doc_extraccion_soportes (afiliado,seccional,periodo,proceso)
                values (:v_afiliado,:v_seccional,:v_periodo,:v_proceso)");
            oci_bind_by_name($insert, ':v_afiliado', $row['DOC']);
            oci_bind_by_name($insert, ':v_seccional', $_SESSION["codmunicipio"]);
            oci_bind_by_name($insert, ':v_periodo', $periodo);
            oci_bind_by_name($insert, ':v_proceso', $proceso);
            oci_execute($insert,OCI_COMMIT_ON_SUCCESS);
            fwrite($txtReporteTrasladosNegados,  $row['OBSERVACION'] . '|' .
                $row['CODENTIDAD'] . '|' .
                $row['TDOC'] . '|' .
                $row['DOC'] . '|' .
                $row['PAPE'] . '|' .
                $row['SAPE'] . '|' .
                $row['PNOM'] . '|' .
                $row['SNOM'] . '|' .
                $row['FNAC'] . '|' .
                $row['SEXO'] . '|' .
                $row['CODDPTO'] . '|' .
                $row['CODMUN'] . '|' .
                $row['NOM_DPTO'] . '|' .
                $row['NOM_MPIO'] . '|' .
                $row['ZONA'] . '|' .
                $row['FAFIL'] . '|' .
                $row['GPOB'] . '|' .
                $row['NIVEL'] . '|' .
                $row['TIPOTRASL'] . '|' .
                $row['PROCESO'] . '|' .
                $row['FICHA'] . '|' .
                $row['DIRECCION'] . '|' .
                $row['BARRIO'] . '|' .
                $row['TELEFONO1'] . '|' .
                $row['TELEFONO2'] . '|' .
                $row['PERIODO_BRUTO'] . '|' .
                $row['TIPO_INGRESO_BRUTO'] . '|' .
                $row['TIPO_INGRESO_EAFI'] . '|' .
                $row['CARNETIZADO_EAFI'] . '|' .
                $row['SOPORTE_GENESIS'] . '|' .
                $row['S5CODEPS'] . '|' .
                $row['NOMBEPS'] . '|' . "\n");
            $arrayAfiliados[] = $row;
        }   
        $countAfiliados = count($arrayAfiliados);
        sqlsrv_free_stmt( $stmt); 
        sqlsrv_close( $conn );         
    }

    if ($proceso == 'RN') {
        //echo $_SESSION["codmunicipio"];
        $consultaRegistros = "SELECT *
        FROM SOFTEPS.DBO.SUB_HISNS (NOLOCK)
        WHERE YEAR(CONVERT(datetime, NSFECHAPROCESO, 103)) = ?
        and MONTH(CONVERT(datetime, NSFECHAPROCESO, 103)) = ? 
        and NSCODDPTOBDUA = ? and NSCODMUNIBDUA = ?
        and NSFUENTE = 'EPS' AND NSRTA = 'VAL';";
        $stmt=sqlsrv_query($conn,$consultaRegistros,array($request->anno,$request->mes,$request->dpto,$request->municipio));
        $txtReporteNovedades = fopen("../../../temp/Reporte_Historial_Novedades_".$nombreTxt.".txt", "c+");
        $rutaTxtReporteNovedades = "../../../temp/Reporte_Historial_Novedades_".$nombreTxt.".txt";
        if( $stmt === false) { 
            die(print_r(sqlsrv_errors(), true)); 
        }
        fwrite($txtReporteNovedades, 'NSCONSE' . '|' .
            'NSEPS' . '|' .
            'NSTIPDOCBDUA' . '|' .
            'NSNUMIDEBDUA' . '|' .
            'NSPRIAPEBDUA' . '|' .
            'NSSEGAPEBDUA' . '|' .
            'NSPRINOMBDUA' . '|' .
            'NSSEGNOMBDUA' . '|' .
            'NSFECNACBDUA' . '|' .
            'NSCODDPTOBDUA' . '|' .
            'NSCODMUNIBDUA' . '|' .
            'NSCODNOV' . '|' .
            'NSFECININOV' . '|' .
            'NSVAL1' . '|' .
            'NSVAL2' . '|' .
            'NSVAL3' . '|' .
            'NSVAL4' . '|' .
            'NSVAL5' . '|' .
            'NSVAL6' . '|' .
            'NSVAL7' . '|' .
            'NSRTA' . '|' .
            'NSGLOSAPRINCIPAL' . '|' .
            'NSGLOSAPROCESO' . '|' .
            'NSFECHAPROCESO' . '|' .
            'NSFUENTE' . '|' .
            'NSFUENTEOBS' . '|' . "\n");
        $arrayAfiliados = array();
        while($row = sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
                // Se insertan las cedulas en la tabla doc_extraccion_soportes
            $insert =  oci_parse($c,"INSERT into doc_extraccion_soportes (afiliado,seccional,periodo,proceso)
                values (:v_afiliado,:v_seccional,:v_periodo,:v_proceso)");
            oci_bind_by_name($insert, ':v_afiliado', $row['NSNUMIDEBDUA']);
            oci_bind_by_name($insert, ':v_seccional', $_SESSION["codmunicipio"]);
                // oci_bind_by_name($insert, ':v_seccional', $municipio);
            oci_bind_by_name($insert, ':v_periodo', $periodo);
            oci_bind_by_name($insert, ':v_proceso', $proceso);
            oci_execute($insert,OCI_COMMIT_ON_SUCCESS);
            fwrite($txtReporteNovedades,  $row['NSCONSE'] . '|' .
                $row['NSEPS'] . '|' .
                $row['NSTIPDOCBDUA'] . '|' .
                $row['NSNUMIDEBDUA'] . '|' .
                $row['NSPRIAPEBDUA'] . '|' .
                $row['NSSEGAPEBDUA'] . '|' .
                $row['NSPRINOMBDUA'] . '|' .
                $row['NSSEGNOMBDUA'] . '|' .
                $row['NSFECNACBDUA'] . '|' .
                $row['NSCODDPTOBDUA'] . '|' .
                $row['NSCODMUNIBDUA'] . '|' .
                $row['NSCODNOV'] . '|' .
                $row['NSFECININOV'] . '|' .
                $row['NSVAL1'] . '|' .
                $row['NSVAL2'] . '|' .
                $row['NSVAL3'] . '|' .
                $row['NSVAL4'] . '|' .
                $row['NSVAL5'] . '|' .
                $row['NSVAL6'] . '|' .
                $row['NSVAL7'] . '|' .
                $row['NSRTA'] . '|' .
                $row['NSGLOSAPRINCIPAL'] . '|' .
                $row['NSGLOSAPROCESO'] . '|' .
                $row['NSFECHAPROCESO'] . '|' .
                $row['NSFUENTE'] . '|' .
                $row['NSFUENTEOBS'] . '|' . "\n");
            $arrayAfiliados[] = $row;
        }   
        $countAfiliados = count($arrayAfiliados);
        sqlsrv_free_stmt( $stmt); 
        sqlsrv_close( $conn );         
    }

    $consultaRutas =  oci_parse($c,"SELECT de.ubgc_nombre departamento, ub.ubgc_nombre municipio, ea.afic_documento documento, e.sdcc_ruta ruta 
                                    from esdc_soporte_doc e
                                    inner join eafi_afiliado ea on ea.afic_tipo_documento = e.sdcc_tipo_doc_afiliado and e.sdcc_afiliado = ea.afic_documento
                                    inner join bubg_ubicacion_geografica ub on ea.afin_ubicacion_geografica = ub.ubgn_ubicacion
                                    inner join bubg_ubicacion_geografica de on de.ubgn_codigo = case length(ea.afin_ubicacion_geografica) when 4 then
                                     substr(ea.afin_ubicacion_geografica,1,1) || '000'
                                     else
                                     substr(ea.afin_ubicacion_geografica,1,2) || '000' end
                                     where e.sdcc_afiliado in (select p.afiliado from
                                     doc_extraccion_soportes p where p.seccional = :v_pcod_dpto and
                                     p.periodo = :v_pperiodo and p.proceso = :v_pproceso and trunc(p.fecha_registro)= trunc(sysdate)) and
                                     e.sdcc_estado in ('A','X','S')");
    oci_bind_by_name($consultaRutas, ':v_pproceso', $proceso);
    oci_bind_by_name($consultaRutas, ':v_pperiodo', $periodo);
    oci_bind_by_name($consultaRutas, ':v_pcod_dpto', $cod_dpto);
    oci_execute($consultaRutas);        
    $arrayRutas = array();
    $dir_files = uniqid();
    while($row = oci_fetch_assoc($consultaRutas)){
        $dir_SubSeccional = $row["DEPARTAMENTO"];
        $dir_SubMunicipio = $row["MUNICIPIO"];
        $dir_SubDocumento = $row["DOCUMENTO"];
        $rutaArchivo = $row["RUTA"];
        $rutaValidar = "../../../temp/".$dir_files."/".$dir_SubSeccional."/".$dir_SubMunicipio."/".$dir_SubDocumento;
        if (file_exists($rutaValidar)) {
            if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$rutaArchivo) == TRUE){
                $name = uniqid();
                $ext = pathinfo($rutaArchivo, PATHINFO_EXTENSION);
                $name = $name.'.'.$ext;
                $local_file = $rutaValidar.'/'.$name;
                $handle = @fopen($local_file, 'w');
                if (@ftp_fget($con_id, $handle, $rutaArchivo, FTP_ASCII, 0)) {
                    //echo $local_file.'<br>';
                } else {
                    //echo $local_file."Error".'<br>';
                }
                @fclose($handle);
            }else{
                    // echo 'El archivo consultado no existe.</br>';
            }
        } else {
            mkdir("../../../temp/".$dir_files."/".$dir_SubSeccional."/".$dir_SubMunicipio."/".$dir_SubDocumento, 0777, true);
            if (is_dir($rutaValidar)) {
                if (file_exists('ftp://ftp_genesis:Senador2019!@192.168.50.10/'.$rutaArchivo) == TRUE){
                    $name = uniqid();
                    $ext = pathinfo($rutaArchivo, PATHINFO_EXTENSION);
                    $name = $name.'.'.$ext;
                    $local_file = $rutaValidar.'/'.$name;
                    $handle = @fopen($local_file, 'w');
                    if (@ftp_fget($con_id, $handle, $rutaArchivo, FTP_ASCII, 0)) {
                            //echo $local_file.'<br>';
                    } else {
                            //echo $local_file."Error".'<br>';
                    }
                    @fclose($handle);
                }else{
                        // echo 'El archivo consultado no existe.</br>';
                }
            }
        }
        $arrayRutas[] = $row;
    }
    oci_close($c);
    $countSoportes = count($arrayRutas);
    $zip = new ZipArchive();
    $dir = '../../../temp/'.$dir_files.'/';
    $rutaFinal = '../../../temp/';
    $archivoCrearZip = '../../../temp/'.$dir_files.'.zip';
    if ($zip->open($archivoCrearZip,ZipArchive::CREATE)===TRUE) {
        if ($handle = opendir($dir)) {
            while (false !== ($entry = readdir($handle))){
                if (is_dir($dir . $entry) && $entry != "." && $entry != ".."){
                    $zip->addEmptyDir($entry);
                    if ($handle2 = opendir($dir.$entry)) {
                        while (false !== ($entry2 = readdir($handle2))){
                            if (is_dir($dir.$entry.'/'.$entry2) && $entry2 != "." && $entry2 != ".."){
                                $zip->addEmptyDir($entry.'/'.$entry2);
                                if ($handle3 = opendir($dir.$entry.'/'.$entry2)) {
                                    while (false !== ($entry3 = readdir($handle3))){
                                        if (is_dir($dir.$entry.'/'.$entry2.'/'.$entry3) && $entry3 != "." && $entry3 != ".."){
                                            $zip->addEmptyDir($entry.'/'.$entry2.'/'.$entry3);
                                            if ($handle4 = opendir($dir.$entry.'/'.$entry2.'/'.$entry3)) {
                                                while (false !== ($entry4 = readdir($handle4))){
                                                    if (is_file($dir.$entry.'/'.$entry2.'/'.$entry3.'/'.$entry4) && $entry4 != "." && $entry4 != ".."){
                                                        $zip->addFile($dir.$entry.'/'.$entry2.'/'.$entry3.'/'.$entry4 , $entry.'/'.$entry2.'/'.$entry3.'/'.$entry4);
                                                    }
                                                }
                                                closedir($handle4);
                                            }
                                        }
                                    }
                                    closedir($handle3);
                                }
                            }
                        }
                        closedir($handle2);
                    }
                }
            }
            closedir($handle);
        }
        $zip->close();
    }
    if ($request->proceso == 'C') {
        $response = array('ruta' => $archivoCrearZip, 'rutatxt' => $rutaTxtReporteCrecimiento, 'soportes' => $countSoportes, 'afiliados' => $countAfiliados);
    }
    if ($request->proceso == 'TN') {
        $response = array('ruta' => $archivoCrearZip, 'rutatxt' => $rutaTxtReporteTrasladosNegados, 'soportes' => $countSoportes, 'afiliados' => $countAfiliados);            
    }
    if ($request->proceso == 'RN') {
        $response = array('ruta' => $archivoCrearZip, 'rutatxt' => $rutaTxtReporteNovedades, 'soportes' => $countSoportes, 'afiliados' => $countAfiliados);            
    }
    echo json_encode($response, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
}

    //INSERTAR HISTORIAL REPORTE GENERADO
function historialSoporte(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $consulta =  oci_parse($c,"INSERT into REPORTE_NOVEDADES_HISTORIAL(RESPONSABLE,FECHA_GENERACION,FECHA_FIN,
       TIPO_REPORTE,HORA_INICIO,HORA_FIN,NOMBRE_RESPONSABLE,PERIODO_REPORTE,
       TRANSCURRIDO,CANT_SOPORTES,CANT_AFILIADOS)
       values(:v_presponsable,:v_pfecha_generacion,:v_pfecha_fin,:v_ptipo_reporte,
       :v_phrinireporte,:v_phrfinreporte,:v_pnombreresponsable,:v_pperiodo_reporte,
       :v_ptranscurso,:v_pcantsoportes,:v_pcantafiliados)"
   );
    oci_bind_by_name($consulta, ':v_presponsable', $request->historial->codResponsable);
    oci_bind_by_name($consulta, ':v_pnombreresponsable', $request->historial->responsable);
    oci_bind_by_name($consulta, ':v_phrinireporte', $request->historial->hrIniReporte);
    oci_bind_by_name($consulta, ':v_phrfinreporte', $request->historial->hrFinReporte);
    oci_bind_by_name($consulta, ':v_ptipo_reporte', $request->tipo_reporte);
    oci_bind_by_name($consulta, ':v_pperiodo_reporte', $request->periodo);
    oci_bind_by_name($consulta, ':v_pfecha_generacion', $request->historial->fechaInicio);
    oci_bind_by_name($consulta, ':v_pfecha_fin', $request->historial->fechaFin);
    oci_bind_by_name($consulta, ':v_ptranscurso', $request->historial->transcurso);
    oci_bind_by_name($consulta, ':v_pcantsoportes', $request->cant_soportes);
    oci_bind_by_name($consulta, ':v_pcantafiliados', $request->cant_afiliados);
    oci_execute($consulta, OCI_COMMIT_ON_SUCCESS);
}

function obtnMunicipio(){
    require_once('../../config/dbcon_prod.php');
    global $request;
    $cod_municipio = $_SESSION["codmunicipio"];
    //echo $cod_municipio;
    $consulta =  oci_parse($c,"SELECT b.ubgc_nombre municipio
       from bubg_ubicacion_geografica b
       where b.ubgn_codigo = :v_pcod_municipio"
   );
    oci_bind_by_name($consulta, ':v_pcod_municipio', $cod_municipio);
    oci_execute($consulta);
    $rows = array();
    while($row = oci_fetch_assoc($consulta))
    {
        $rows[] = $row;
    }
    echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
    oci_close($c);
}

    // CODIGO POSIBLE A UTILIZAR
    // function rmDir_rf(){
    //     global $request;
    //     $zip = $request->zip;
    //     if ($handle = opendir($zip)) {
    //         while (false !== ($entry = readdir($handle))){
    //             echo $entry.'<br>';
    //             unlink($zip.$entry);
    //             if (is_dir($zip.$entry) && $entry != "." && $entry != ".."){
    //                 rmdir($zip.$entry);
    //                 if ($handle4 = opendir($dir.$entry.'/'.$entry2.'/'.$entry3)) {
    //                     while (false !== ($entry4 = readdir($handle4))){
    //                         if (is_file($dir.$entry.'/'.$entry2.'/'.$entry3.'/'.$entry4) && $entry4 != "." && $entry4 != ".."){
    //                             $zip->addFile($dir.$entry.'/'.$entry2.'/'.$entry3.'/'.$entry4 , $entry.'/'.$entry2.'/'.$entry3.'/'.$entry4);
    //                         }
    //                     }
    //                     // while (false !== is_file($dir.$entry.'/'.$entry2.'/'.$entry3)){
    //                     //     // if (is_file($dir . $entry) && $entry != "." && $entry != ".."){
    //                     //     // $zip->addFile($dir."/Seccional/Municipio/CC1045739521/".$name , $entry.'/test.txt');
    //                     //     $zip->addFile($dir.$dir_SubSeccional."/".$dir_SubMunicipio."/".$dir_SubDocumento."/".$name , $entry.'/'.$name);
    //                     // }
    //                 closedir($handle4);
    //                 }
    //             }
    //             if (is_file($zip.$entry) && $entry != "." && $entry != ".."){
    //                 unlink($zip);
    //             }
    //         }
    //     closedir($handle);
    //     }
    // }

    // function listar_carpetas($carpeta) {
    //     //le añadimos la barra a la carpeta que le hemos pasado
    //     $ruta = $carpeta;
    //     //comprueba si la ruta que le hemos pasado es un directorio
    //     if(is_dir($ruta)) {
    //         //fijamos la ruta del directorio que se va a abrir
    //         if($dir = opendir($ruta)) {
    //             //si el directorio se puede abrir
    //             while(($archivo = readdir($dir)) !== false) {
    //                 //le avisamos que no lea el "." y los dos ".."
    //                 if (is_dir($ruta.$archivo) && $archivo != '.' && $archivo != '..') {
    //                     //comprobramos que se trata de un directorio
    //                     //si efectivamente es una carpeta saltará a nuestra próxima función
    //                     leer_carpeta($ruta.$archivo);
    //                 } 
    //             }
    //             //cerramos directorio abierto anteriormente
    //             closedir($dir);
    //         } 
    //     } 
    // }

    // recogemos  la ruta para entrar en el segundo nivel
    // function leer_carpeta($leercarpeta) {
    //     //le añadimos la barra final
    //     $leercarpeta = $leercarpeta . "/";

    //     if(is_dir($leercarpeta)){
    //         if($dir = opendir($leercarpeta)){
    //             while(($archivo = readdir($dir)) !== false){
    //                 if($archivo != '.' && $archivo != '..') {
    //                     /* imprimimos el nombre del archivo, si quisieramos podriamos poner en este punto por ejemplo un enlace 
    //                     al archivo para que se abriera una imagen o un PDF al hacer click encima del nombre. */
    //                     echo $archivo; 
    //                 } 
    //             }
    //             closedir($dir);
    //         } 
    //     }
    // }
?>