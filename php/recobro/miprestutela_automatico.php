<?php
function rango__fecha_Registrar_BD($datos, $cantidad, $regimen)
{
    require('../config/dbcon_login.php');
    $consulta = oci_parse($c, 'begin pq_genesis_mipres_direccionamiento.p_inserta_tutelas_json(:v_prescripcion,:v_cantidad,:v_regimen,:v_json_row); end;');
    $json = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_prescripcion', $datos);
    oci_bind_by_name($consulta, ':v_cantidad', $cantidad);
    oci_bind_by_name($consulta, ':v_regimen', $regimen);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);

    oci_execute($consulta, OCI_DEFAULT);
    if (isset($clob)) {
        $json = $clob->read($clob->size());
        // echo $json;
    } else {
        // echo 0;
    }
    oci_close($c);
}

function tutela_diaria($fecha, $Token)
{
    stream_context_set_default([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);
    set_time_limit(0);
    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://wsmipres.sispro.gov.co/WSMIPRESNOPBS/api/Tutelas/890102044/$fecha/$Token",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "Accept: */*",
            "Accept-Encoding: gzip, deflate",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            "Host: wsmipres.sispro.gov.co",
            "Postman-Token: cea3e529-efa7-4e42-880e-9342b17f73f8,4c014db5-6201-4c50-bb6d-269a260eec47",
            "User-Agent: PostmanRuntime/7.19.0",
            "cache-control: no-cache"
        )
    ));
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    if ($err) {
        return "1";
    } else {
        return $response;
    }
}


function rango__fecha($regimen, $fecha_inicio, $fecha_fin)
{
    $Token = ($regimen === "C" ?  "6C96F59B-8556-4451-A02B-A1D4BD4DCD45" : "361067B8-9AAF-436C-8C0D-3A19A8D63449");
    $date = $fecha_inicio;
    $end_date = $fecha_fin;
    $json = tutela_diaria($date, $Token);

    while (strtotime($date) <= strtotime($end_date)) {
        $date = date("Y-m-d", strtotime("+1 day", strtotime($date)));
        $info = tutela_diaria($date, $Token);
        if ($info === 0) {
            echo 0;
            exit();
        } else {
            $json  = $info . "," . $json;
        }
    }
    $json_test = json_decode("[" . $json . "]");
    $datos = '';
    for ($i = 0; $i < sizeof($json_test); $i++) {
        for ($j = 0; $j < sizeof($json_test[$i]); $j++) {
            //$datos = $datos . ',' . json_encode($json_test[$i][$j]);
            $datos = $datos . ',' . json_encode($json_test[$i][$j]->tutela);
            $datos_test = "[" . substr($datos, 1) . "]";
            $datos_test_c = count(json_decode($datos_test));
            rango__fecha_Registrar_BD($datos_test,$datos_test_c,$regimen);
        }
    }
    
    // echo $datos_test;
    // echo '<br>';
    // echo $datos_test_c;
    //if($datos_test_c > 0){
    //	rango__fecha_Registrar_BD($datos_test,$datos_test_c,$regimen);
    //}
    // echo "[".$json."]";
}
// "2021-12-28"
$hoy = date("Y-m-d");
//$hoy = '2021-12-28';
rango__fecha('S',$hoy,$hoy);
rango__fecha('C',$hoy,$hoy);
