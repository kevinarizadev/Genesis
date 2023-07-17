<?php
  require_once('../config/dbcon_prod.php'); 
  $contributivo = "6C96F59B-8556-4451-A02B-A1D4BD4DCD45";
  $subsidiado = "361067B8-9AAF-436C-8C0D-3A19A8D63449";
 $hoy = new DateTime();
 $hoy = new DateTime();

 
 
 //GET_tutelaES_API($fecha, $subsidiado);
 //GET_tutelaES_API($fecha, $contributivo);
 

$date = '2021-03-10';
$end_date = '2021-03-15';
while (strtotime($date) <= strtotime($end_date)) {
    $fecha = $date;
    $timeIni = time();
    $FHIni = date("H:i:s", $timeIni);

    GET_tutelaES_API($fecha, $contributivo);
    GET_tutelaES_API($fecha, $subsidiado);

    $timeFin = time();
    $FHFin = date("H:i:s", $timeFin);

    $duracion = tiempoTranscurridoFechas($FHIni,$FHFin);

    echo "Día: " . $date . ' finalizado. Duración: ' . $duracion . ' <br>';
    $date = date ("Y-m-d", strtotime("+1 day", strtotime($date)));
}

function tiempoTranscurridoFechas($fechaInicio,$fechaFin){
    $fecha1 = new DateTime($fechaInicio);
    $fecha2 = new DateTime($fechaFin);
    $fecha = $fecha1->diff($fecha2);
    $tiempo = "";
         
    //años
    if($fecha->y > 0)
    {
        $tiempo .= $fecha->y;
             
        if($fecha->y == 1)
            $tiempo .= " año, ";
        else
            $tiempo .= " años, ";
    }
         
    //meses
    if($fecha->m > 0)
    {
        $tiempo .= $fecha->m;
             
        if($fecha->m == 1)
            $tiempo .= " mes, ";
        else
            $tiempo .= " meses, ";
    }
         
    //dias
    if($fecha->d > 0)
    {
        $tiempo .= $fecha->d;
             
        if($fecha->d == 1)
            $tiempo .= " día, ";
        else
            $tiempo .= " días, ";
    }
         
    //horas
    if($fecha->h > 0)
    {
        $tiempo .= $fecha->h;
             
        if($fecha->h == 1)
            $tiempo .= " hora, ";
        else
            $tiempo .= " horas, ";
    }
         
    //minutos
    if($fecha->i > 0)
    {
        $tiempo .= $fecha->i;
             
        if($fecha->i == 1)
            $tiempo .= " minuto";
        else
            $tiempo .= " minutos";
    }
    else if($fecha->i == 0) //segundos
        $tiempo .= $fecha->s." segundos";
         
    return $tiempo;
}

function GET_tutelaES_API($fecha,$token){
  stream_context_set_default([
    'ssl' => [
      'verify_peer' => false,
      'verify_peer_name' => false,
    ]
  ]);

  set_time_limit(0);
  $curl = curl_init();
  curl_setopt_array($curl, array(
    ///api/tutela/{nit}/{fecha}/{token} 

    CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/Tutelas/890102044/$fecha/$token", //"https://wsmipres.sispro.gov.co/WSMIPRESNOPBSGET/api/tutela/$Nit/$Fecha/$Token",
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
    ),
  ));
  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);

  if ($err) {
    return "cURL Error #:" . $err;
  } else {
    
    $data = json_decode($response, true);
    // echo json_encode($data);
    // echo $response;
    //  var_dump($data);
    insert_tutelas($token,$data);
  }
}

function insert_tutelas($marca,$data){
  global $c;
// var_dump($c);
  $contributivo = "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18";
  $subsidiado = "66F0B346-F8D0-4BA7-8182-B1722C9B68A7";
  
    $insert_tutela = oci_parse($c, 'INSERT into oasis.ops_tutela
    (notutela, ftutela, htutela, codeps, tipoideps, nroideps, tipoidprof, numidprof, pnprofs, snprofs, paprofs, saprofs, regprofs, tipoidpaciente, nroidpaciente, pnpaciente, snpaciente, papaciente, sapaciente, nrofallo, ffallotutela, f1instan, f2instan, fcorte, fdesacato, enfhuerfana, codenfhuerfana, enfhuerfanadx, coddxppal, coddxrel1, coddxrel2, aclfallotut, coddxmots1, coddxmots2, coddxmots3, justifmed, critdef1cc, critdef2cc, critdef3cc, critdef4cc, tipoidmadrepaciente, nroidmadrepaciente, esttut, regimen)
  values
    (:v_notutela, :v_ftutela, :v_htutela, :v_codeps, :v_tipoideps, :v_nroideps, :v_tipoidprof, :v_numidprof, :v_pnprofs, :v_snprofs, :v_paprofs, :v_saprofs, :v_regprofs, :v_tipoidpaciente, :v_nroidpaciente, :v_pnpaciente, :v_snpaciente, :v_papaciente, :v_sapaciente, :v_nrofallo, :v_ffallotutela, :v_f1instan, :v_f2instan, :v_fcorte, :v_fdesacato, :v_enfhuerfana, :v_codenfhuerfana, :v_enfhuerfanadx, :v_coddxppal, :v_coddxrel1, :v_coddxrel2, :v_aclfallotut, :v_coddxmots1, :v_coddxmots2, :v_coddxmots3, :v_justifmed, :v_critdef1cc, :v_critdef2cc, :v_critdef3cc, :v_critdef4cc, :v_tipoidmadrepaciente, :v_nroidmadrepaciente, :v_esttut, :v_regimen)');
            $regimen = (($marca===$contributivo) ? "C" : "S");
    oci_bind_by_name($insert_tutela, ':v_regimen',$regimen, 100);
    oci_bind_by_name($insert_tutela, ':V_notutela',$notutela , 100); 
     oci_bind_by_name($insert_tutela, ':V_ftutela',$ftutela , 100); 
     oci_bind_by_name($insert_tutela, ':V_htutela',$htutela , 100); 
     oci_bind_by_name($insert_tutela, ':V_codeps',$codeps , 100); 
     oci_bind_by_name($insert_tutela, ':V_tipoideps',$tipoideps , 100); 
     oci_bind_by_name($insert_tutela, ':V_nroideps',$nroideps , 100); 
     oci_bind_by_name($insert_tutela, ':V_tipoidprof',$tipoidprof , 100); 
     oci_bind_by_name($insert_tutela, ':V_numidprof',$numidprof , 100); 
     oci_bind_by_name($insert_tutela, ':V_pnprofs',$pnprofs , 100); 
     oci_bind_by_name($insert_tutela, ':V_snprofs',$snprofs , 100); 
     oci_bind_by_name($insert_tutela, ':V_paprofs',$paprofs , 100); 
     oci_bind_by_name($insert_tutela, ':V_saprofs',$saprofs , 100); 
     oci_bind_by_name($insert_tutela, ':V_regprofs',$regprofs , 100); 
     oci_bind_by_name($insert_tutela, ':V_tipoidpaciente',$tipoidpaciente , 100); 
     oci_bind_by_name($insert_tutela, ':V_nroidpaciente',$nroidpaciente , 100); 
     oci_bind_by_name($insert_tutela, ':V_pnpaciente',$pnpaciente , 100); 
     oci_bind_by_name($insert_tutela, ':V_snpaciente',$snpaciente , 100); 
     oci_bind_by_name($insert_tutela, ':V_papaciente',$papaciente , 100); 
     oci_bind_by_name($insert_tutela, ':V_sapaciente',$sapaciente , 100); 
     oci_bind_by_name($insert_tutela, ':V_nrofallo',$nrofallo , 100); 
     oci_bind_by_name($insert_tutela, ':V_ffallotutela',$ffallotutela , 100); 
     oci_bind_by_name($insert_tutela, ':V_f1instan',$f1instan , 100); 
     oci_bind_by_name($insert_tutela, ':V_f2instan',$f2instan , 100); 
     oci_bind_by_name($insert_tutela, ':V_fcorte',$fcorte , 100); 
     oci_bind_by_name($insert_tutela, ':V_fdesacato',$fdesacato , 100); 
     oci_bind_by_name($insert_tutela, ':V_enfhuerfana',$enfhuerfana , 100); 
     oci_bind_by_name($insert_tutela, ':V_codenfhuerfana',$codenfhuerfana , 100); 
     oci_bind_by_name($insert_tutela, ':V_enfhuerfanadx',$enfhuerfanadx , 100); 
     oci_bind_by_name($insert_tutela, ':V_coddxppal',$coddxppal , 100); 
     oci_bind_by_name($insert_tutela, ':V_coddxrel1',$coddxrel1 , 100); 
     oci_bind_by_name($insert_tutela, ':V_coddxrel2',$coddxrel2 , 100); 
     oci_bind_by_name($insert_tutela, ':V_aclfallotut',$aclfallotut , 100); 
     oci_bind_by_name($insert_tutela, ':V_coddxmots1',$coddxmots1 , 100); 
     oci_bind_by_name($insert_tutela, ':V_coddxmots2',$coddxmots2 , 100); 
     oci_bind_by_name($insert_tutela, ':V_coddxmots3',$coddxmots3 , 100); 
     oci_bind_by_name($insert_tutela, ':V_justifmed',$justifmed , 100); 
     oci_bind_by_name($insert_tutela, ':V_critdef1cc',$critdef1cc , 100); 
     oci_bind_by_name($insert_tutela, ':V_critdef2cc',$critdef2cc , 100); 
     oci_bind_by_name($insert_tutela, ':V_critdef3cc',$critdef3cc , 100); 
     oci_bind_by_name($insert_tutela, ':V_critdef4cc',$critdef4cc , 100); 
     oci_bind_by_name($insert_tutela, ':V_tipoidmadrepaciente',$tipoidmadrepaciente , 100); 
     oci_bind_by_name($insert_tutela, ':V_nroidmadrepaciente',$nroidmadrepaciente , 100); 
     oci_bind_by_name($insert_tutela, ':V_esttut',$esttut , 100); 

  for ($i = 0; $i <= count($data)-1; $i++) {

// echo ( $data[$i]['tutela']['Futela']);
        $notutela  = ( $data[$i]['tutela']['NoTutela']);  
        $ftutela  = ( $data[$i]['tutela']['FTutela']);  
        $htutela  = ( $data[$i]['tutela']['HTutela']);  
        $codeps  = ( $data[$i]['tutela']['CodEPS']);  
        $tipoideps  = ( $data[$i]['tutela']['TipoIDEPS']);  
        $nroideps  = ( $data[$i]['tutela']['NroIDEPS']);  
        $tipoidprof  = ( $data[$i]['tutela']['TipoIDProf']);  
        $numidprof  = ( $data[$i]['tutela']['NumIDProf']);  
        $pnprofs  = ( $data[$i]['tutela']['PNProfS']);  
        $snprofs  = ( $data[$i]['tutela']['SNProfS']);  
        $paprofs  = ( $data[$i]['tutela']['PAProfS']);  
        $saprofs  = ( $data[$i]['tutela']['SAProfS']);  
        $regprofs  = ( $data[$i]['tutela']['RegProfS']);  
        $tipoidpaciente  = ( $data[$i]['tutela']['TipoIDPaciente']);  
        $nroidpaciente  = ( $data[$i]['tutela']['NroIDPaciente']);  
        $pnpaciente  = ( $data[$i]['tutela']['PNPaciente']);  
        $snpaciente  = ( $data[$i]['tutela']['SNPaciente']);  
        $papaciente  = ( $data[$i]['tutela']['PAPaciente']);  
        $sapaciente  = ( $data[$i]['tutela']['SAPaciente']);  
        $nrofallo  = ( $data[$i]['tutela']['NroFallo']);  
        $ffallotutela  = ( $data[$i]['tutela']['FFalloTutela']);  
        $f1instan  = ( $data[$i]['tutela']['F1Instan']);  
        $f2instan  = ( $data[$i]['tutela']['F2Instan']);  
        $fcorte  = ( $data[$i]['tutela']['FCorte']);  
        $fdesacato  = ( $data[$i]['tutela']['FDesacato']);  
        $enfhuerfana  = ( $data[$i]['tutela']['EnfHuerfana']);  
        $codenfhuerfana  = ( $data[$i]['tutela']['CodEnfHuerfana']);  
        $enfhuerfanadx  = ( $data[$i]['tutela']['EnfHuerfanaDX']);  
        $coddxppal  = ( $data[$i]['tutela']['CodDxPpal']);  
        $coddxrel1  = ( $data[$i]['tutela']['CodDxRel1']);  
        $coddxrel2  = ( $data[$i]['tutela']['CodDxRel2']);  
        $aclfallotut  = ( $data[$i]['tutela']['AclFalloTut']);  
        $coddxmots1  = ( $data[$i]['tutela']['CodDxMotS1']);  
        $coddxmots2  = ( $data[$i]['tutela']['CodDxMotS2']);  
        $coddxmots3  = ( $data[$i]['tutela']['CodDxMotS3']);  
        $justifmed  = ( $data[$i]['tutela']['JustifMed']);  
        $critdef1cc  = ( $data[$i]['tutela']['CritDef1CC']);  
        $critdef2cc  = ( $data[$i]['tutela']['CritDef2CC']);  
        $critdef3cc  = ( $data[$i]['tutela']['CritDef3CC']);  
        $critdef4cc  = ( $data[$i]['tutela']['CritDef4CC']);  
        $tipoidmadrepaciente  = ( $data[$i]['tutela']['TipoIDMadrePaciente']);  
        $nroidmadrepaciente  = ( $data[$i]['tutela']['NroIDMadrePaciente']);  
        $esttut  = ( $data[$i]['tutela']['EstTut']);  
   oci_execute($insert_tutela);
   //echo "Mipres: " . $data[$i]['tutela']['Notutela'] . " insertado correctamente. <br>";
   
}   
}

function SEND_MAIL(){
   global $c;
    $consulta = oci_parse($c,'begin p_envia_correo_html(:v_penvia, :v_pdestinatario, :v_pdestinatario_copia, :v_pdestinatario_copia_ocul, :v_pasunto, :v_pmensaje_html); end;');
    $envia ="kevin.hernandez@cajacopieps.com";
    $asunto ="Reporte Cargue tutelaes";    
    $mensaje_html ="Buenas noches, Genesis informa que las tutelaes radicadas a Cajacopi EPS han sido cargadas a las estructuras de la base de datos";
    $destinatario ="angelo.mendoza@cajacopieps.com";
    $destinatario_copia = "harry.marquez@cajacopieps.com";
    $destinatario_copia_ocul = "ivan.acuna@cajacopieps.com";
    oci_bind_by_name($consulta, ':v_penvia',$envia, 100);
    oci_bind_by_name($consulta, ':v_pdestinatario',$destinatario, 100);
    oci_bind_by_name($consulta, ':v_pdestinatario_copia',$destinatario_copia, 100);
    oci_bind_by_name($consulta, ':v_pdestinatario_copia_ocul',$destinatario_copia_ocul, 100);  
    oci_bind_by_name($consulta, ':v_pasunto',$asunto, 100);  
    oci_bind_by_name($consulta, ':v_pmensaje_html',$mensaje_html, 100);        
    oci_execute($consulta);
    oci_close($c);
  }

?>