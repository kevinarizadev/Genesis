<?php
require_once ('../config/dbcon_prod.php');
$contributivo = "6C96F59B-8556-4451-A02B-A1D4BD4DCD45";
$subsidiado = "361067B8-9AAF-436C-8C0D-3A19A8D63449";
 $hoy = new DateTime();
 $hoy->modify('-1 day');
$fecha = $hoy->format("Y-m-d");
GET_PRESCRIPCIONES_API($fecha, $contributivo);    
GET_PRESCRIPCIONES_API($fecha, $subsidiado);

/*
$date = '2020-09-27';
$end_date = '2020-09-27';
while (strtotime($date) <= strtotime($end_date))
{

    $fecha = $date;
    $timeIni = time();
    $FHIni = date("H:i:s", $timeIni);

    GET_PRESCRIPCIONES_API($fecha, $contributivo);    
    GET_PRESCRIPCIONES_API($fecha, $subsidiado);

    $timeFin = time();
    $FHFin = date("H:i:s", $timeFin);

    $duracion = tiempoTranscurridoFechas($FHIni, $FHFin);

    echo "Día: " . $date . ' finalizado. Duración: ' . $duracion . ' <br>';
    $date = date("Y-m-d", strtotime("+1 day", strtotime($date)));
}
*/
function tiempoTranscurridoFechas($fechaInicio, $fechaFin)
{
    $fecha1 = new DateTime($fechaInicio);
    $fecha2 = new DateTime($fechaFin);
    $fecha = $fecha1->diff($fecha2);
    $tiempo = "";

    //años
    if ($fecha->y > 0)
    {
        $tiempo .= $fecha->y;

        if ($fecha->y == 1) $tiempo .= " año, ";
        else $tiempo .= " años, ";
    }

    //meses
    if ($fecha->m > 0)
    {
        $tiempo .= $fecha->m;

        if ($fecha->m == 1) $tiempo .= " mes, ";
        else $tiempo .= " meses, ";
    }

    //dias
    if ($fecha->d > 0)
    {
        $tiempo .= $fecha->d;

        if ($fecha->d == 1) $tiempo .= " día, ";
        else $tiempo .= " días, ";
    }

    //horas
    if ($fecha->h > 0)
    {
        $tiempo .= $fecha->h;

        if ($fecha->h == 1) $tiempo .= " hora, ";
        else $tiempo .= " horas, ";
    }

    //minutos
    if ($fecha->i > 0)
    {
        $tiempo .= $fecha->i;

        if ($fecha->i == 1) $tiempo .= " minuto";
        else $tiempo .= " minutos";
    }
    else if ($fecha->i == 0) //segundos
    $tiempo .= $fecha->s . " segundos";

    return $tiempo;
}

function CLEAN_VARIABLES()
{
    $noprescripcion ="";
    $renglon ="";
    $pronututilizado ="";
    $cantidad ="";
    $valor = "";
    $utilidad ="";
    $tipo_tec ="";
    $tipopres ="";
    $IndEsp ="";
    $IndRec ="";
    $NoFAdmon ="";
    $CodFreAdmon ="";
    $DurTrat ="";
    $CanTrat ="";
    $NoFAdmon ="";
    $CodFreAdmon ="";
    $CodVA ="";
    $Dosis ="";
    $DosisUM ="";
}

function GET_PRESCRIPCIONES_API($fecha, $token)
{
    stream_context_set_default(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false, ]]);

    set_time_limit(0);
    $curl = curl_init();
    curl_setopt_array($curl, array(
        ///api/Prescripcion/{nit}/{fecha}/{token}
        CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/Prescripcion/890102044/$fecha/$token", //"https://wsmipres.sispro.gov.co/WSMIPRESNOPBSGET/api/Prescripcion/$Nit/$Fecha/$Token",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_TIMEOUT => 0,
        CURLOPT_HTTPHEADER => array(
            "Accept: application/json",
            "Accept-Encoding: gzip, deflate",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            "Host: wsmipres.sispro.gov.co",
            "Postman-Token: b9a9086c-0dee-41e4-8d54-3e9e66d170f9,2ae7526d-d803-4c18-8d10-4edabae157ae",
            "User-Agent: PostmanRuntime/7.15.2",
            "cache-control: no-cache"
        ) ,
    ));
    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err){
        return "cURL Error #:" . $err;
    }
    else
    {
        $data = json_decode($response, true);       
        insert_prescripciones($token, $data);

    }

  //  $consulta_dia = file_get_contents('../../json/recobro/consulta_dia.json');
    //$tempo_data = json_decode($consulta_dia);
   // echo json_encode($tempo_data);
    //insert_prescripciones($token, $tempo_data);

    /*

    $data = file_get_contents('../../json/recobro/prescripciones.json');
    
    insert_prescripciones($token, $data);*/
}

function insert_prescripciones($marca, $asd)
{
    global $c;
    // var_dump($c);
    $contributivo = "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18";
    $subsidiado = "66F0B346-F8D0-4BA7-8182-B1722C9B68A7";


    /*$validacion_existencia = oci_parse($c, 'select *
      from ops_prescripcion p
      where p.noprescripcion = 20200802178021613187');
    //oci_bind_by_name($validacion_existencia, ':v_noprescripcion',$noprescripcion , 100);
    oci_execute($validacion_existencia);
    $numrows = oci_fetch_all($validacion_existencia, $res);
    echo $numrows;
    // echo $cantidad_ex;
    exit;*/

    require_once('../config/dbcon_prod.php');
    global $request;
    $cantidad_prescripciones = sizeof($asd);
	$consulta =  oci_parse($c, 'begin PQ_GENESIS_MIPRES_DIRECCIONAMIENTO.P_INSERTAR_JSON_PRESCRIPCION_CABEZA_DETALLE_MASIVO(:v_prescripcion,
    :v_pcantidadregistros,
    :v_json_row);
end;');
    
    $json_parametros = oci_new_descriptor($c, OCI_D_LOB);	    
    oci_bind_by_name($consulta, ':v_prescripcion', $json_parametros, -1, OCI_B_CLOB);
    $json_parametros->writeTemporary(json_encode($asd)); 
	//oci_bind_by_name($consulta,':v_prescripcion',);
	oci_bind_by_name($consulta,':v_pcantidadregistros', $cantidad_prescripciones);
    
    
   

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

    $fecha_registro = date("d/m/Y");
    /*echo json_encode($data).' ';
    echo ' '.sizeof($data);*/
            
}


function SEND_MAIL()
{
    global $c;
    $consulta = oci_parse($c, 'begin p_envia_correo_html(:v_penvia, :v_pdestinatario, :v_pdestinatario_copia, :v_pdestinatario_copia_ocul, :v_pasunto, :v_pmensaje_html); end;');
    $envia = "kevin.hernandez@cajacopieps.com";
    $asunto = "Reporte Cargue Prescripciones";
    $mensaje_html = "Buenas noches, Genesis informa que las prescripciones radicadas a Cajacopi EPS han sido cargadas a las estructuras de la base de datos";
    $destinatario = "angelo.mendoza@cajacopieps.com";
    $destinatario_copia = "harry.marquez@cajacopieps.com";
    $destinatario_copia_ocul = "ivan.acuna@cajacopieps.com";
    oci_bind_by_name($consulta, ':v_penvia', $envia, 100);
    oci_bind_by_name($consulta, ':v_pdestinatario', $destinatario, 100);
    oci_bind_by_name($consulta, ':v_pdestinatario_copia', $destinatario_copia, 100);
    oci_bind_by_name($consulta, ':v_pdestinatario_copia_ocul', $destinatario_copia_ocul, 100);
    oci_bind_by_name($consulta, ':v_pasunto', $asunto, 100);
    oci_bind_by_name($consulta, ':v_pmensaje_html', $mensaje_html, 100);
    oci_execute($consulta);
    oci_close($c);
}

?>
