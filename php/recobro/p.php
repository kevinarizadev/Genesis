<?php
  require_once('../config/dbcon_prod.php'); 
$contributivo = "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18";
$subsidiado = "66F0B346-F8D0-4BA7-8182-B1722C9B68A7";
 $hoy = new DateTime();
 $hoy->modify('-1 day');
 $fecha = $hoy->format("Y-m-d");
 $date = $fecha;
 $end_date = $fecha;

while (strtotime($date) <= strtotime($end_date)) {

	$fecha = $date;
	$timeIni = time();
	$FHIni = date("H:i:s", $timeIni);

	GET_PRESCRIPCIONES_API($fecha, $contributivo);
	GET_PRESCRIPCIONES_API($fecha, $subsidiado);

	$timeFin = time();
	$FHFin = date("H:i:s", $timeFin);

	$duracion = tiempoTranscurridoFechas($FHIni,$FHFin);

	echo "Día: " . $date . ' finalizado. Duración: ' . $duracion . ' <br>';
	$date = date ("Y-m-d", strtotime("+1 day", strtotime($date)));
}

function tiempoTranscurridoFechas($fechaInicio,$fechaFin)
{
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

function GET_PRESCRIPCIONES_API($fecha,$token){
  stream_context_set_default([
    'ssl' => [
      'verify_peer' => false,
      'verify_peer_name' => false,
    ]
  ]);

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
    ),
  ));
  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);

  if ($err) {
    return "cURL Error #:" . $err;
  } else {
    $data = json_decode($response, true);
    insert_prescripciones($token,$data);
  }
}

function insert_prescripciones($marca,$data){
  global $c;
// var_dump($c);
  $contributivo = "C7BF5293-8F73-483D-B77D-5B7C6FFCFD18";
  $subsidiado = "66F0B346-F8D0-4BA7-8182-B1722C9B68A7";
  
    $insert_mipres = oci_parse($c, 'INSERT into oasis.ops_prescripcion (noprescripcion, fprescripcion, hprescripcion, codhabips, tipoidips, nroidips, coddanemunips, dirsedeips, telsedeips, tipoidprof, numidprof, pnprofs, snprofs, paprofs, saprofs, regprofs, tipoidpaciente, nroidpaciente, codambate, refambate, enfhuerfana, codenfhuerfana, enfhuerfanadx, coddxppal, coddxrel1, coddxrel2, sopnutricional, codeps, tipoidmadrepaciente, nroidmadrepaciente, tipotransc, tipoiddonantevivo, nroiddonantevivo, estpres,regimen) values        (:v_noprescripcion, :v_fprescripcion, :v_hprescripcion, :v_codhabips, :v_tipoidips, :v_nroidips, :v_coddanemunips, :v_dirsedeips, :v_telsedeips, :v_tipoidprof, :v_numidprof, :v_pnprofs, :v_snprofs, :v_paprofs, :v_saprofs, :v_regprofs, :v_tipoidpaciente, :v_nroidpaciente, :v_codambate, :v_refambate, :v_enfhuerfana, :v_codenfhuerfana, :v_enfhuerfanadx, :v_coddxppal, :v_coddxrel1, :v_coddxrel2, :v_sopnutricional, :v_codeps, :v_tipoidmadrepaciente, :v_nroidmadrepaciente, :v_tipotransc, :v_tipoiddonantevivo, :v_nroiddonantevivo, :v_estpres,:v_regimen)');
            $regimen = (($marca===$contributivo) ? "C" : "S");
              oci_bind_by_name($insert_mipres, ':v_regimen',$regimen, 100);
                oci_bind_by_name($insert_mipres, ':v_noprescripcion',$noprescripcion , 100);
                oci_bind_by_name($insert_mipres, ':v_fprescripcion', $fprescripcion, 100);
                oci_bind_by_name($insert_mipres, ':v_hprescripcion', $hprescripcion, 100);
                oci_bind_by_name($insert_mipres, ':v_codhabips', $codhabips, 100);
                oci_bind_by_name($insert_mipres, ':v_tipoidips', $tipoidips, 100);
                oci_bind_by_name($insert_mipres, ':v_nroidips', $nroidips, 100);
                oci_bind_by_name($insert_mipres, ':v_coddanemunips', $coddanemunips, 100);
                oci_bind_by_name($insert_mipres, ':v_dirsedeips', $dirsedeips, 100);
                oci_bind_by_name($insert_mipres, ':v_telsedeips', $telsedeips, 100);
                oci_bind_by_name($insert_mipres, ':v_tipoidprof', $tipoidprof, 100);
                oci_bind_by_name($insert_mipres, ':v_numidprof', $numidprof, 100);
                oci_bind_by_name($insert_mipres, ':v_pnprofs', $pnprofs, 100);
                oci_bind_by_name($insert_mipres, ':v_snprofs', $snprofs, 100);
                oci_bind_by_name($insert_mipres, ':v_paprofs', $paprofs, 100);
                oci_bind_by_name($insert_mipres, ':v_saprofs', $saprofs, 100);
                oci_bind_by_name($insert_mipres, ':v_regprofs', $regprofs, 100);
                oci_bind_by_name($insert_mipres, ':v_tipoidpaciente', $tipoidpaciente, 100);
                oci_bind_by_name($insert_mipres, ':v_nroidpaciente', $nroidpaciente, 100);
                oci_bind_by_name($insert_mipres, ':v_codambate', $codambate, 100);
                oci_bind_by_name($insert_mipres, ':v_refambate', $refambate, 100);
                oci_bind_by_name($insert_mipres, ':v_enfhuerfana', $enfhuerfana, 100);
                oci_bind_by_name($insert_mipres, ':v_codenfhuerfana', $codenfhuerfana, 100);
                oci_bind_by_name($insert_mipres, ':v_enfhuerfanadx', $enfhuerfanadx, 100);
                oci_bind_by_name($insert_mipres, ':v_coddxppal', $coddxppal, 100);
                oci_bind_by_name($insert_mipres, ':v_coddxrel1', $coddxrel1, 100);
                oci_bind_by_name($insert_mipres, ':v_coddxrel2', $coddxrel2, 100);
                oci_bind_by_name($insert_mipres, ':v_sopnutricional', $sopnutricional, 100);
                oci_bind_by_name($insert_mipres, ':v_codeps', $codeps, 100);
                oci_bind_by_name($insert_mipres, ':v_tipoidmadrepaciente', $tipoidmadrepaciente, 100);
                oci_bind_by_name($insert_mipres, ':v_nroidmadrepaciente', $nroidmadrepaciente, 100);
                oci_bind_by_name($insert_mipres, ':v_tipotransc', $tipotransc, 100);
                oci_bind_by_name($insert_mipres, ':v_tipoiddonantevivo', $tipoiddonantevivo, 100);
                oci_bind_by_name($insert_mipres, ':v_nroiddonantevivo', $nroiddonantevivo, 100);
                oci_bind_by_name($insert_mipres, ':v_estpres', $estpres, 100);
    $insert_producto = oci_parse($c, 'INSERT into oasis.ops_producto_nut
             (noprescripcion, cantrat, canttotalf, causas1, causas2, causas3, causas4, causas5, codforma, codfreadmon,
                codviaadmon, conorden, dxcapal, dxdespro, dxenfhuer, dxenfrcev, dxvih, descprodnutr, descrzn41, descrzn42,
                descrzn51, descrzn52, descrzn53, descrzn54, dosis, dosisum, durtrat, estjm, indesp, indrec, noprescaso, nroidpaciente,
                pronutdescartado, pronututilizado, rzncausas41, rzncausas42, rzncausas51, rzncausas52, rzncausas53, rzncausas54, tipoidpaciente, tipoprest,
                tipppronut, ufcanttotal, tipo_tec)
                values
                (:v_noprescripcion, :v_cantrat, :v_canttotalf, :v_causas1, :v_causas2, :v_causas3, :v_causas4, :v_causas5, :v_codforma, :v_codfreadmon, 
                :v_codviaadmon, :v_conorden, :v_dxcapal, :v_dxdespro, :v_dxenfhuer, :v_dxenfrcev, :v_dxvih, :v_descprodnutr, :v_descrzn41, :v_descrzn42,
                :v_descrzn51, :v_descrzn52, :v_descrzn53, :v_descrzn54, :v_dosis, :v_dosisum, :v_durtrat, :v_estjm, :v_indesp, :v_indrec, :v_noprescaso, :v_nroidpaciente,
                :v_pronutdescartado, :v_pronututilizado, :v_rzncausas41, :v_rzncausas42, :v_rzncausas51, :v_rzncausas52, :v_rzncausas53, :v_rzncausas54, :v_tipoidpaciente,:v_tipoprest, :v_tipppronut, :v_ufcanttotal, :v_tipo_tec)');

              oci_bind_by_name($insert_producto, ':v_noprescripcion', $noprescripcion, 100);
              oci_bind_by_name($insert_producto, ':v_cantrat', $cantrat, 100);
              oci_bind_by_name($insert_producto, ':v_canttotalf', $canttotalf, 100);
              oci_bind_by_name($insert_producto, ':v_causas1', $causas1, 100);
              oci_bind_by_name($insert_producto, ':v_causas2', $causas2, 100);
              oci_bind_by_name($insert_producto, ':v_causas3', $causas3, 100);
              oci_bind_by_name($insert_producto, ':v_causas4', $causas4, 100);
              oci_bind_by_name($insert_producto, ':v_causas5', $causas5, 100);
              oci_bind_by_name($insert_producto, ':v_codforma', $codforma, 100);
              oci_bind_by_name($insert_producto, ':v_codfreadmon', $codfreadmon, 100);
              oci_bind_by_name($insert_producto, ':v_codviaadmon', $codviaadmon, 100);
              oci_bind_by_name($insert_producto, ':v_conorden', $conorden, 100);
              oci_bind_by_name($insert_producto, ':v_dxcapal', $dxcapal, 100);
              oci_bind_by_name($insert_producto, ':v_dxdespro', $dxdespro, 100);
              oci_bind_by_name($insert_producto, ':v_dxenfhuer', $dxenfhuer, 100);
              oci_bind_by_name($insert_producto, ':v_dxenfrcev', $dxenfrcev, 100);
              oci_bind_by_name($insert_producto, ':v_dxvih', $dxvih, 100);
              oci_bind_by_name($insert_producto, ':v_descprodnutr', $descprodnutr, 100);
              oci_bind_by_name($insert_producto, ':v_descrzn41', $descrzn41, 100);
              oci_bind_by_name($insert_producto, ':v_descrzn42', $descrzn42, 100);
              oci_bind_by_name($insert_producto, ':v_descrzn51', $descrzn51, 100);
              oci_bind_by_name($insert_producto, ':v_descrzn52', $descrzn52, 100);
              oci_bind_by_name($insert_producto, ':v_descrzn53', $descrzn53, 100);
              oci_bind_by_name($insert_producto, ':v_descrzn54', $descrzn54, 100);
              oci_bind_by_name($insert_producto, ':v_dosis', $dosis, 100);
              oci_bind_by_name($insert_producto, ':v_dosisum', $dosisum, 100);
              oci_bind_by_name($insert_producto, ':v_durtrat', $durtrat, 100);
              oci_bind_by_name($insert_producto, ':v_estjm', $estjm, 100);
              oci_bind_by_name($insert_producto, ':v_indesp', $indesp, 100);
              oci_bind_by_name($insert_producto, ':v_indrec', $indrec, 100);
              oci_bind_by_name($insert_producto, ':v_noprescaso', $noprescaso, 100);
              oci_bind_by_name($insert_producto, ':v_nroidpaciente', $nroidpaciente, 100);
              oci_bind_by_name($insert_producto, ':v_pronutdescartado', $pronutdescartado, 100);
              oci_bind_by_name($insert_producto, ':v_pronututilizado', $pronututilizado, 100);
              oci_bind_by_name($insert_producto, ':v_rzncausas41', $rzncausas41, 100);
              oci_bind_by_name($insert_producto, ':v_rzncausas42', $rzncausas42, 100);
              oci_bind_by_name($insert_producto, ':v_rzncausas51', $rzncausas51, 100);
              oci_bind_by_name($insert_producto, ':v_rzncausas52', $rzncausas52, 100);
              oci_bind_by_name($insert_producto, ':v_rzncausas53', $rzncausas53, 100);
              oci_bind_by_name($insert_producto, ':v_rzncausas54', $rzncausas54, 100);
              oci_bind_by_name($insert_producto, ':v_tipoidpaciente', $tipoidpaciente, 100);
              oci_bind_by_name($insert_producto, ':v_tipoprest', $tipoprest, 100);
              oci_bind_by_name($insert_producto, ':v_tipppronut', $tipppronut, 100);
              oci_bind_by_name($insert_producto, ':v_ufcanttotal', $ufcanttotal, 100);
              oci_bind_by_name($insert_producto, ':v_tipo_tec', $tipo_tec, 100);
    $insert_procedimiento = oci_parse($c,'INSERT into oasis.ops_procedimiento
        (noprescripcion, conorden, tipoprest, causas11, causas12, causas2, causas3, causas4, propbsutilizado, causas5, propbsdescartado,
        rzncausas51, descrzn51, rzncausas52, descrzn52, causas6, causas7, codcups, canform, cadafreuso, codfreuso, cant, canttotal,
        codperdurtrat, justnopbs, indrec, estjm)
        values
        (:v_noprescripcion, :v_conorden, :v_tipoprest, :v_causas11, :v_causas12, :v_causas2, :v_causas3, :v_causas4, :v_propbsutilizado, :v_causas5, :v_propbsdescartado, :v_rzncausas51, :v_descrzn51, :v_rzncausas52, :v_descrzn52, :v_causas6, :v_causas7, :v_codcups, :v_canform, :v_cadafreuso, :v_codfreuso, :v_cant, :v_canttotal, :v_codperdurtrat, :v_justnopbs, :v_indrec, :v_estjm)');
          oci_bind_by_name($insert_procedimiento,  ':v_noprescripcion',$noprescripcion ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_conorden',$conorden ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_tipoprest',$tipoprest ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_causas11',$causas11 ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_causas12',$causas12 ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_causas2',$causas2 ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_causas3',$causas3 ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_causas4', $causas4 ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_propbsutilizado',$propbsutilizado ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_causas5',$causas5 ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_propbsdescartado',$propbsdescartado ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_rzncausas51',$rzncausas51 ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_descrzn51',$descrzn51 ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_rzncausas52',$rzncausas52 ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_descrzn52',$descrzn52 ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_causas6',$causas6 ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_causas7',$causas7 ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_codcups',$codcups ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_canform',$canform ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_cadafreuso',$cadafreuso ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_codfreuso',$codfreuso ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_cant',$cant ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_canttotal',$canttotal ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_codperdurtrat',$codperdurtrat ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_justnopbs',$justnopbs ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_indrec',$indrec ,100);
          oci_bind_by_name($insert_procedimiento,  ':v_estjm',$estjm ,100);
    $insert_complementario = oci_parse($c, 'INSERT into oasis.ops_complementario 
        (noprescripcion, conorden, tipoprest, causas1, causas2,   causas3, causas4, desccausas4, causas5, codsercomp, descsercomp, canform, cadafreuso, codfreuso, cant, canttotal, codperdurtrat, tipotrans, reqacom, tipoidacomalb, nroidacomalb, parentacomalb, nombalb, codmunorialb, codmundesalb, justnopbs, indrec, estjm) 
        values (:v_noprescripcion, :v_conorden, :v_tipoprest, :v_causas1, :v_causas2, :v_causas3, :v_causas4, :v_desccausas4, :v_causas5, :v_codsercomp, :v_descsercomp, :v_canform, :v_cadafreuso, :v_codfreuso, :v_cant, :v_canttotal, :v_codperdurtrat, :v_tipotrans, :v_reqacom, :v_tipoidacomalb, :v_nroidacomalb, :v_parentacomalb, :v_nombalb, :v_codmunorialb, :v_codmundesalb, :v_justnopbs, :v_indrec, :v_estjm)');
          oci_bind_by_name($insert_complementario,  ':v_noprescripcion',$noprescripcion ,100);
          oci_bind_by_name($insert_complementario,':v_conorden',$conorden,100);
          oci_bind_by_name($insert_complementario,':v_tipoprest',$tipoprest,100);
          oci_bind_by_name($insert_complementario,':v_causas1',$causas1,100);
          oci_bind_by_name($insert_complementario,':v_causas2',$causas2,100);
          oci_bind_by_name($insert_complementario,':v_causas3',$causas3,100);
          oci_bind_by_name($insert_complementario,':v_causas4',$causas4,100);
          oci_bind_by_name($insert_complementario,':v_desccausas4',$desccausas4,100);
          oci_bind_by_name($insert_complementario,':v_causas5',$causas5,100);
          oci_bind_by_name($insert_complementario,':v_codsercomp',$codsercomp,100);
          oci_bind_by_name($insert_complementario,':v_descsercomp',$descsercomp,100);
          oci_bind_by_name($insert_complementario,':v_canform',$canform,100);
          oci_bind_by_name($insert_complementario,':v_cadafreuso',$cadafreuso,100);
          oci_bind_by_name($insert_complementario,':v_codfreuso',$codfreuso,100);
          oci_bind_by_name($insert_complementario,':v_cant',$cant,100);
          oci_bind_by_name($insert_complementario,':v_canttotal',$canttotal,100);
          oci_bind_by_name($insert_complementario,':v_codperdurtrat',$codperdurtrat,100);
          oci_bind_by_name($insert_complementario,':v_tipotrans',$tipotrans,100);
          oci_bind_by_name($insert_complementario,':v_reqacom',$reqacom,100);
          oci_bind_by_name($insert_complementario,':v_tipoidacomalb',$tipoidacomalb,100);
          oci_bind_by_name($insert_complementario,':v_nroidacomalb',$nroidacomalb,100);
          oci_bind_by_name($insert_complementario,':v_parentacomalb',$parentacomalb,100);
          oci_bind_by_name($insert_complementario,':v_nombalb',$nombalb,100);
          oci_bind_by_name($insert_complementario,':v_codmunorialb',$codmunorialb,100);
          oci_bind_by_name($insert_complementario,':v_codmundesalb',$codmundesalb,100);
          oci_bind_by_name($insert_complementario,':v_justnopbs',$justnopbs,100);
          oci_bind_by_name($insert_complementario,':v_indrec',$indrec,100);
          oci_bind_by_name($insert_complementario,':v_estjm',$estjm,100);
    $insert_medicamentos = oci_parse($c, 'INSERT into oasis.ops_medicamento
        (noprescripcion, id_medicamento, cantrat, canttotalf, causas1, causas2, causas3, causas4, causas5, causas6, codff, codfreadmon, codva, conorden, descmedprinact, descrzn31, descrzn32, descrzn41, descrzn42, descrzn43, descrzn44, dosis, dosisum, durtrat, estjm, indesp, indrec, indicacionesunirs, justnopbs, medpbsdescartado, medpbsutilizado, nofadmon, nroidpaciente, principiosactivos, rzncausas5, rzncausas31, rzncausas32, rzncausas41, rzncausas42, rzncausas43, rzncausas44, tipoidpaciente, tipomed, tipoprest, ufcanttotal, tipo_tec)
        values
        (:v_noprescripcion, :v_id_medicamento, :v_cantrat, :v_canttotalf, :v_causas1, :v_causas2, :v_causas3, :v_causas4, :v_causas5, :v_causas6, :v_codff, :v_codfreadmon, :v_codva, :v_conorden, :v_descmedprinact, :v_descrzn31, :v_descrzn32, :v_descrzn41, :v_descrzn42, :v_descrzn43, :v_descrzn44, :v_dosis, :v_dosisum, :v_durtrat, :v_estjm, :v_indesp, :v_indrec, :v_indicacionesunirs, :v_justnopbs, :v_medpbsdescartado, :v_medpbsutilizado, :v_nofadmon, :v_nroidpaciente, :v_principiosactivos, :v_rzncausas5, :v_rzncausas31, :v_rzncausas32, :v_rzncausas41, :v_rzncausas42, :v_rzncausas43, :v_rzncausas44, :v_tipoidpaciente, :v_tipomed, :v_tipoprest, :v_ufcanttotal, :v_tipo_tec)');
          oci_bind_by_name($insert_medicamentos,':v_noprescripcion', $noprescripcion,100);
          oci_bind_by_name($insert_medicamentos,':v_id_medicamento', $id_medicamento,100);
          oci_bind_by_name($insert_medicamentos,':v_cantrat', $cantrat,100);
          oci_bind_by_name($insert_medicamentos,':v_canttotalf', $canttotalf,100);
          oci_bind_by_name($insert_medicamentos,':v_causas1', $causas1,100);
          oci_bind_by_name($insert_medicamentos,':v_causas2', $causas2,100);
          oci_bind_by_name($insert_medicamentos,':v_causas3', $causas3,100);
          oci_bind_by_name($insert_medicamentos,':v_causas4', $causas4,100);
          oci_bind_by_name($insert_medicamentos,':v_causas5', $causas5,100);
          oci_bind_by_name($insert_medicamentos,':v_causas6', $causas6,100);
          oci_bind_by_name($insert_medicamentos,':v_codff', $codff,100);
          oci_bind_by_name($insert_medicamentos,':v_codfreadmon', $codfreadmon,100);
          oci_bind_by_name($insert_medicamentos,':v_codva', $codva,100);
          oci_bind_by_name($insert_medicamentos,':v_conorden', $conorden,100);
          oci_bind_by_name($insert_medicamentos,':v_descmedprinact', $descmedprinact,100);
          oci_bind_by_name($insert_medicamentos,':v_descrzn31', $descrzn31,100);
          oci_bind_by_name($insert_medicamentos,':v_descrzn32', $descrzn32,100);
          oci_bind_by_name($insert_medicamentos,':v_descrzn41', $descrzn41,100);
          oci_bind_by_name($insert_medicamentos,':v_descrzn42', $descrzn42,100);
          oci_bind_by_name($insert_medicamentos,':v_descrzn43', $descrzn43,100);
          oci_bind_by_name($insert_medicamentos,':v_descrzn44', $descrzn44,100);
          oci_bind_by_name($insert_medicamentos,':v_dosis', $dosis,100);
          oci_bind_by_name($insert_medicamentos,':v_dosisum', $dosisum,100);
          oci_bind_by_name($insert_medicamentos,':v_durtrat', $durtrat,100);
          oci_bind_by_name($insert_medicamentos,':v_estjm', $estjm,100);
          oci_bind_by_name($insert_medicamentos,':v_indesp', $indesp,100);
          oci_bind_by_name($insert_medicamentos,':v_indrec', $indrec,100);
          oci_bind_by_name($insert_medicamentos,':v_indicacionesunirs', $indicacionesunirs,100);
          oci_bind_by_name($insert_medicamentos,':v_justnopbs', $justnopbs,100);
          oci_bind_by_name($insert_medicamentos,':v_medpbsdescartado', $medpbsdescartado,100);
          oci_bind_by_name($insert_medicamentos,':v_medpbsutilizado', $medpbsutilizado,100);
          oci_bind_by_name($insert_medicamentos,':v_nofadmon', $nofadmon,100);
          oci_bind_by_name($insert_medicamentos,':v_nroidpaciente', $nroidpaciente,100);
          oci_bind_by_name($insert_medicamentos,':v_principiosactivos', $principiosactivos,100);
          oci_bind_by_name($insert_medicamentos,':v_rzncausas5', $rzncausas5,100);
          oci_bind_by_name($insert_medicamentos,':v_rzncausas31', $rzncausas31,100);
          oci_bind_by_name($insert_medicamentos,':v_rzncausas32', $rzncausas32,100);
          oci_bind_by_name($insert_medicamentos,':v_rzncausas41', $rzncausas41,100);
          oci_bind_by_name($insert_medicamentos,':v_rzncausas42', $rzncausas42,100);
          oci_bind_by_name($insert_medicamentos,':v_rzncausas43', $rzncausas43,100);
          oci_bind_by_name($insert_medicamentos,':v_rzncausas44', $rzncausas44,100);
          oci_bind_by_name($insert_medicamentos,':v_tipoidpaciente', $tipoidpaciente,100);
          oci_bind_by_name($insert_medicamentos,':v_tipomed', $tipomed,100);
          oci_bind_by_name($insert_medicamentos,':v_tipoprest', $tipoprest,100);
          oci_bind_by_name($insert_medicamentos,':v_ufcanttotal', $ufcanttotal,100);
          oci_bind_by_name($insert_medicamentos,':v_tipo_tec',$tipo_tec,100);

  for ($i = 0; $i <= count($data)-1; $i++) {
   $noprescripcion  = ( $data[$i]['prescripcion']['NoPrescripcion']);
   $fprescripcion  = ( $data[$i]['prescripcion']['FPrescripcion']);
   $hprescripcion  = ( $data[$i]['prescripcion']['HPrescripcion']);
   $codhabips  = ( $data[$i]['prescripcion']['CodHabIPS']);
   $tipoidips  = ( $data[$i]['prescripcion']['TipoIDIPS']);
   $nroidips  = ( $data[$i]['prescripcion']['NroIDIPS']);
   $coddanemunips  = ( $data[$i]['prescripcion']['CodDANEMunIPS']);
   $dirsedeips  = ( $data[$i]['prescripcion']['DirSedeIPS']);
   $telsedeips  = ( $data[$i]['prescripcion']['TelSedeIPS']);
   $tipoidprof  = ( $data[$i]['prescripcion']['TipoIDProf']);
   $numidprof  = ( $data[$i]['prescripcion']['NumIDProf']);
   $pnprofs  = ( $data[$i]['prescripcion']['PNProfS']);
   $snprofs  = ( $data[$i]['prescripcion']['SNProfS']);
   $paprofs  = ( $data[$i]['prescripcion']['PAProfS']);
   $saprofs  = ( $data[$i]['prescripcion']['SAProfS']);
   $regprofs  = ( $data[$i]['prescripcion']['RegProfS']);
   $tipoidpaciente  = ( $data[$i]['prescripcion']['TipoIDPaciente']);
   $nroidpaciente  = ( $data[$i]['prescripcion']['NroIDPaciente']);
   $codambate  = ( $data[$i]['prescripcion']['CodAmbAte']);
   $refambate  = ( $data[$i]['prescripcion']['RefAmbAte']);
   $enfhuerfana  = ( $data[$i]['prescripcion']['EnfHuerfana']);
   $codenfhuerfana  = ( $data[$i]['prescripcion']['CodEnfHuerfana']);
   $enfhuerfanadx  = ( $data[$i]['prescripcion']['EnfHuerfanaDX']);
   $coddxppal  = ( $data[$i]['prescripcion']['CodDxPpal']);
   $coddxrel1  = ( $data[$i]['prescripcion']['CodDxRel1']);
   $coddxrel2  = ( $data[$i]['prescripcion']['CodDxRel2']);
   $sopnutricional  = ( $data[$i]['prescripcion']['SopNutricional']);
   $codeps  = ( $data[$i]['prescripcion']['CodEPS']);
   $tipoidmadrepaciente  = ( $data[$i]['prescripcion']['TipoIDMadrePaciente']);
   $nroidmadrepaciente  = ( $data[$i]['prescripcion']['NroIDMadrePaciente']);
   $tipotransc  = ( $data[$i]['prescripcion']['TipoTransc']);
   $tipoiddonantevivo  = ( $data[$i]['prescripcion']['TipoIDDonanteVivo']);
   $nroiddonantevivo  = ( $data[$i]['prescripcion']['NroIDDonanteVivo']);
   $estpres  = ( $data[$i]['prescripcion']['EstPres']);
   oci_execute($insert_mipres);
   //echo "Mipres: " . $data[$i]['prescripcion']['NoPrescripcion'] . " insertado correctamente. <br>";
   if (count($data[$i]['productosnutricionales'])>0) {
    for ($j=0; $j <= count($data[$i]['productosnutricionales'])-1; $j++) {     
                 // echo $data[$i]['productosnutricionales'][$j]['TipoPrest'];
                // $noprescripcion = ($data[$i]['prescripcion'][$j]['noprescripcion']);
           $conorden = ($data[$i]['productosnutricionales'][$j]['ConOrden']);
           $tipoprest = ($data[$i]['productosnutricionales'][$j]['TipoPrest']);
           $causas1 = ($data[$i]['productosnutricionales'][$j]['CausaS1']);
           $causas2 = ($data[$i]['productosnutricionales'][$j]['CausaS2']);
           $causas3 = ($data[$i]['productosnutricionales'][$j]['CausaS3']);
           $causas4 = ($data[$i]['productosnutricionales'][$j]['CausaS4']);
           $pronututilizado = ($data[$i]['productosnutricionales'][$j]['ProNutUtilizado']);
           $rzncausas41 = ($data[$i]['productosnutricionales'][$j]['RznCausaS41']);
           $descrzn41 = ($data[$i]['productosnutricionales'][$j]['DescRzn41']);
           $rzncausas42 = ($data[$i]['productosnutricionales'][$j]['RznCausaS42']);
           $descrzn42 = ($data[$i]['productosnutricionales'][$j]['DescRzn42']);
           $causas5 = ($data[$i]['productosnutricionales'][$j]['CausaS5']);
           $pronutdescartado = ($data[$i]['productosnutricionales'][$j]['ProNutDescartado']);
           $rzncausas51 = ($data[$i]['productosnutricionales'][$j]['RznCausaS51']);
           $descrzn51 = ($data[$i]['productosnutricionales'][$j]['DescRzn51']);
           $rzncausas52 = ($data[$i]['productosnutricionales'][$j]['RznCausaS52']);
           $descrzn52 = ($data[$i]['productosnutricionales'][$j]['DescRzn52']);
           $rzncausas53 = ($data[$i]['productosnutricionales'][$j]['RznCausaS53']);
           $descrzn53 = ($data[$i]['productosnutricionales'][$j]['DescRzn53']);
           $rzncausas54 = ($data[$i]['productosnutricionales'][$j]['RznCausaS54']);
           $descrzn54 = ($data[$i]['productosnutricionales'][$j]['DescRzn54']);
           $dxenfhuer = ($data[$i]['productosnutricionales'][$j]['DXEnfHuer']);
           $dxvih = ($data[$i]['productosnutricionales'][$j]['DXVIH']);
           $dxcapal = ($data[$i]['productosnutricionales'][$j]['DXCaPal']);
           $dxenfrcev = ($data[$i]['productosnutricionales'][$j]['DXEnfRCEV']);
           $dxdespro = ($data[$i]['productosnutricionales'][$j]['DXDesPro']);
           $tipppronut = ($data[$i]['productosnutricionales'][$j]['TippProNut']);
           $descprodnutr = ($data[$i]['productosnutricionales'][$j]['DescProdNutr']);
           $codforma = ($data[$i]['productosnutricionales'][$j]['CodForma']);
           $codviaadmon = ($data[$i]['productosnutricionales'][$j]['CodViaAdmon']);
           $justnopbs = ($data[$i]['productosnutricionales'][$j]['JustNoPBS']);
           $dosis = ($data[$i]['productosnutricionales'][$j]['Dosis']);
           $dosisum = ($data[$i]['productosnutricionales'][$j]['DosisUM']);
           $nofadmon = ($data[$i]['productosnutricionales'][$j]['NoFAdmon']);
           $codfreadmon = ($data[$i]['productosnutricionales'][$j]['CodFreAdmon']);
           $indesp = ($data[$i]['productosnutricionales'][$j]['IndEsp']);
           $cantrat = ($data[$i]['productosnutricionales'][$j]['CanTrat']);
           $durtrat = ($data[$i]['productosnutricionales'][$j]['DurTrat']);
           $canttotalf = ($data[$i]['productosnutricionales'][$j]['CantTotalF']);
           $ufcanttotal = ($data[$i]['productosnutricionales'][$j]['UFCantTotal']);
           $indrec = ($data[$i]['productosnutricionales'][$j]['IndRec']);
           $noprescaso = ($data[$i]['productosnutricionales'][$j]['NoPrescAso']);
           $estjm = ($data[$i]['productosnutricionales'][$j]['EstJM']);
           $tipo_tec = 'N';
                //var_dump($data[$i]['productosnutricionales'][$j]);
             oci_execute($insert_producto);
             }  
          }
      if (count($data[$i]['procedimientos'])>0) {
        for ($j=0; $j <= count($data[$i]['procedimientos'])-1; $j++) {
              $conorden = ($data[$i]['procedimientos'][$j]['ConOrden']);
              $tipoprest = ($data[$i]['procedimientos'][$j]['TipoPrest']);
              $causas11 = ($data[$i]['procedimientos'][$j]['CausaS11']);
              $causas12 = ($data[$i]['procedimientos'][$j]['CausaS12']);
              $causas2 = ($data[$i]['procedimientos'][$j]['CausaS2']);
              $causas3 = ($data[$i]['procedimientos'][$j]['CausaS3']);
              $causas4 = ($data[$i]['procedimientos'][$j]['CausaS4']);
              $propbsutilizado = ($data[$i]['procedimientos'][$j]['ProPBSUtilizado']);
              $causas5 = ($data[$i]['procedimientos'][$j]['CausaS5']);
              $propbsdescartado = ($data[$i]['procedimientos'][$j]['ProPBSDescartado']);
              $rzncausas51 = ($data[$i]['procedimientos'][$j]['RznCausaS51']);
              $descrzn51 = ($data[$i]['procedimientos'][$j]['DescRzn51']);
              $rzncausas52 = ($data[$i]['procedimientos'][$j]['RznCausaS52']);
              $descrzn52 = ($data[$i]['procedimientos'][$j]['DescRzn52']);
              $causas6 = ($data[$i]['procedimientos'][$j]['CausaS6']);
              $causas7 = ($data[$i]['procedimientos'][$j]['CausaS7']);
              $codcups = ($data[$i]['procedimientos'][$j]['CodCUPS']);
              $canform = ($data[$i]['procedimientos'][$j]['CanForm']);
              $cadafreuso = ($data[$i]['procedimientos'][$j]['CadaFreUso']);
              $codfreuso = ($data[$i]['procedimientos'][$j]['CodFreUso']);
              $cant = ($data[$i]['procedimientos'][$j]['Cant']);
              $canttotal = ($data[$i]['procedimientos'][$j]['CantTotal']);
              $codperdurtrat = ($data[$i]['procedimientos'][$j]['CodPerDurTrat']);
              $justnopbs = ($data[$i]['procedimientos'][$j]['JustNoPBS']);
              $indrec = ($data[$i]['procedimientos'][$j]['IndRec']);
              $estjm = ($data[$i]['procedimientos'][$j]['EstJM']);
              oci_execute($insert_procedimiento);
              }
          }
      if (count($data[$i]['serviciosComplementarios'])>0) {
         for ($j=0; $j <= count($data[$i]['serviciosComplementarios'])-1; $j++) {
                    // $noprescripcion = ($data[$i]['prescripcion'][$j]['noprescripcion']);
                $conorden = ($data[$i]['serviciosComplementarios'][$j]['ConOrden']);
                $tipoprest = ($data[$i]['serviciosComplementarios'][$j]['TipoPrest']); 
                $causas1 = ($data[$i]['serviciosComplementarios'][$j]['CausaS1']);
                $causas2 = ($data[$i]['serviciosComplementarios'][$j]['CausaS2']);
                $causas3 = ($data[$i]['serviciosComplementarios'][$j]['CausaS3']);
                $causas4 = ($data[$i]['serviciosComplementarios'][$j]['CausaS4']);
                $desccausas4 = ($data[$i]['serviciosComplementarios'][$j]['DescCausaS4']);
                $causas5 = ($data[$i]['serviciosComplementarios'][$j]['CausaS5']);
                $codsercomp = ($data[$i]['serviciosComplementarios'][$j]['CodSerComp']);
                $descsercomp = ($data[$i]['serviciosComplementarios'][$j]['DescSerComp']);
                $canform = ($data[$i]['serviciosComplementarios'][$j]['CanForm']);
                $cadafreuso = ($data[$i]['serviciosComplementarios'][$j]['CadaFreUso']);
                $codfreuso = ($data[$i]['serviciosComplementarios'][$j]['CodFreUso']);
                $cant = ($data[$i]['serviciosComplementarios'][$j]['Cant']);
                $canttotal = ($data[$i]['serviciosComplementarios'][$j]['CantTotal']);
                $codperdurtrat = ($data[$i]['serviciosComplementarios'][$j]['CodPerDurTrat']);
                $tipotrans = ($data[$i]['serviciosComplementarios'][$j]['TipoTrans']);
                $reqacom = ($data[$i]['serviciosComplementarios'][$j]['ReqAcom']);
                $tipoidacomalb = ($data[$i]['serviciosComplementarios'][$j]['TipoIDAcomAlb']);
                $nroidacomalb = ($data[$i]['serviciosComplementarios'][$j]['NroIDAcomAlb']);
                $parentacomalb = ($data[$i]['serviciosComplementarios'][$j]['ParentAcomAlb']);
                $nombalb = ($data[$i]['serviciosComplementarios'][$j]['NombAlb']);
                $codmunorialb = ($data[$i]['serviciosComplementarios'][$j]['CodMunOriAlb']);
                $codmundesalb = ($data[$i]['serviciosComplementarios'][$j]['CodMunDesAlb']);
                $justnopbs = ($data[$i]['serviciosComplementarios'][$j]['JustNoPBS']);
                $indrec = ($data[$i]['serviciosComplementarios'][$j]['IndRec']);
                $estjm = ($data[$i]['serviciosComplementarios'][$j]['EstJM']);

                oci_execute($insert_complementario);
              }
            }
      if (count($data[$i]['medicamentos'])>0) {
          for ($j=0; $j <= count($data[$i]['medicamentos'])-1; $j++) {
                  // $noprescripcion  = ($data[$i]['medicamentos'][$j]['noprescripcion']);
                  // $id_medicamento  = ($data[$i]['medicamentos'][$j]['id_medicamento']);
                  $cantrat  = ($data[$i]['medicamentos'][$j]['CanTrat']);
                  $canttotalf  = ($data[$i]['medicamentos'][$j]['CantTotalF']);
                  $causas1  = ($data[$i]['medicamentos'][$j]['CausaS1']);
                  $causas2  = ($data[$i]['medicamentos'][$j]['CausaS2']);
                  $causas3  = ($data[$i]['medicamentos'][$j]['CausaS3']);
                  $causas4  = ($data[$i]['medicamentos'][$j]['CausaS4']);
                  $causas5  = ($data[$i]['medicamentos'][$j]['CausaS5']);
                  $causas6  = ($data[$i]['medicamentos'][$j]['CausaS6']);
                  $codff  = ($data[$i]['medicamentos'][$j]['CodFF']);
                  $codfreadmon  = ($data[$i]['medicamentos'][$j]['CodFreAdmon']);
                  $codva  = ($data[$i]['medicamentos'][$j]['CodVA']);
                  $conorden  = ($data[$i]['medicamentos'][$j]['ConOrden']);
                  $descmedprinact  = ($data[$i]['medicamentos'][$j]['DescMedPrinAct']);
                  $descrzn31  = ($data[$i]['medicamentos'][$j]['DescRzn31']);
                  $descrzn32  = ($data[$i]['medicamentos'][$j]['DescRzn32']);
                  $descrzn41  = ($data[$i]['medicamentos'][$j]['DescRzn41']);
                  $descrzn42  = ($data[$i]['medicamentos'][$j]['DescRzn42']);
                  $descrzn43  = ($data[$i]['medicamentos'][$j]['DescRzn43']);
                  $descrzn44  = ($data[$i]['medicamentos'][$j]['DescRzn44']);
                  $dosis  = ($data[$i]['medicamentos'][$j]['Dosis']);
                  $dosisum  = ($data[$i]['medicamentos'][$j]['DosisUM']);
                  $durtrat  = ($data[$i]['medicamentos'][$j]['DurTrat']);
                  $estjm  = ($data[$i]['medicamentos'][$j]['EstJM']);
                  $indesp  = ($data[$i]['medicamentos'][$j]['IndEsp']);
                  $indrec  = ($data[$i]['medicamentos'][$j]['IndRec']);
                  $indicacionesunirs  = json_encode(($data[$i]['medicamentos'][$j]['IndicacionesUNIRS']));
                  $justnopbs  = ($data[$i]['medicamentos'][$j]['JustNoPBS']);
                  $medpbsdescartado  = ($data[$i]['medicamentos'][$j]['MedPBSDescartado']);
                  $medpbsutilizado  = ($data[$i]['medicamentos'][$j]['MedPBSUtilizado']);
                  $nofadmon  = ($data[$i]['medicamentos'][$j]['NoFAdmon']);
                  $principiosactivos  = json_encode(($data[$i]['medicamentos'][$j]['PrincipiosActivos']));
                  $rzncausas5  = ($data[$i]['medicamentos'][$j]['RznCausaS5']);
                  $rzncausas31  = ($data[$i]['medicamentos'][$j]['RznCausaS31']);
                  $rzncausas32  = ($data[$i]['medicamentos'][$j]['RznCausaS32']);
                  $rzncausas41  = ($data[$i]['medicamentos'][$j]['RznCausaS41']);
                  $rzncausas42  = ($data[$i]['medicamentos'][$j]['RznCausaS42']);
                  $rzncausas43  = ($data[$i]['medicamentos'][$j]['RznCausaS43']);
                  $rzncausas44  = ($data[$i]['medicamentos'][$j]['RznCausaS44']);
                  $tipomed  = ($data[$i]['medicamentos'][$j]['TipoMed']);
                  $tipoprest  = ($data[$i]['medicamentos'][$j]['TipoPrest']);
                  $ufcanttotal  = ($data[$i]['medicamentos'][$j]['UFCantTotal']);
                  // $tipoidpaciente  = ($data[$i]['medicamentos'][$j]['tipoidpaciente']);
                  // $nroidpaciente  = ($data[$i]['medicamentos'][$j]['nroidpaciente']);
                  // $tipo_tec  = ($data[$i]['medicamentos'][$j]['Tipo_Tec']);

                  oci_execute($insert_medicamentos);}
            } 
}   
}

function SEND_MAIL(){
   global $c;
    $consulta = oci_parse($c,'begin p_envia_correo_html(:v_penvia, :v_pdestinatario, :v_pdestinatario_copia, :v_pdestinatario_copia_ocul, :v_pasunto, :v_pmensaje_html); end;');
    $envia ="kevin.hernandez@cajacopieps.com";
    $asunto ="Reporte Cargue Prescripciones";    
    $mensaje_html ="Buenas noches, Genesis informa que las prescripciones radicadas a Cajacopi EPS han sido cargadas a las estructuras de la base de datos";
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