<?php

  require_once('../config/dbcon_prod.php');

  $i = 2 ;
  $panno    = $_GET["panno"];
  $pperiodo = $_GET["pperiodo"];
  $ptercero = $_GET["ptercero"];
  $pdocumento = $_GET["pdocumento"];
  $pnumero =  $_GET["pnumero"];
  $pubicacion = $_GET["pubicacion"];
  $consulta = oci_parse($c,'select DOCUMENTO_CR, NUMERO_CR,UBICACION_CR,FACF_FECHA_CR,FACV_TOTAL_PAGO,FACF_FACTURA,FACC_FACTURA,facn_contrato_capitado 
                            from oasis.traza_pago_km
                            where anno = :v_panno
                            and periodo = :v_pperiodo
                            and facv_tercero = :v_ptercero
                            and documento_cr = :v_pdocumento
                            and numero_cr = :v_pnumero
                            and ubicacion_cr = :v_pubicacion');
  oci_bind_by_name($consulta,':v_panno',$panno);
  oci_bind_by_name($consulta,':v_pperiodo',$pperiodo);
  oci_bind_by_name($consulta,':v_ptercero',$ptercero);
  oci_bind_by_name($consulta,':v_pdocumento',$pdocumento);
  oci_bind_by_name($consulta,':v_pnumero',$pnumero);
  oci_bind_by_name($consulta,':v_pubicacion',$pubicacion);
  oci_execute($consulta);
  error_reporting(E_ALL);
  ini_set("display_errors", TRUE);
  ini_set("display_startup_errors", TRUE);
  date_default_timezone_set("America/Bogota");

  $nombre="PAGOS_".$pdocumento."_".$pnumero."_".$pubicacion.".xls";
  header("Content-type: application/vnd.ms-excel");
  header("Content-Disposition: attachment; filename=$nombre");

  $row = array();
  echo '<table border="1" width="100%" align="center">'.
       '<tr style="text-align:center !important; color:#000; font-style:normal;font-size:14px">'.
            '<th>DOCUMENTO</th>'.
            '<th>NUMERO</th>'.
            '<th>UBICACION</th>'.
            '<th>FECHA PAGO</th>'.
            '<th>VALOR CANCELADO</th>'.
            '<th>FECHA DE RADICACION</th>'.
            '<th>NUMERO DE FACTURA</th>'.
            '<th>NUMERO DE CONTRATO</th>'.
        '</tr>';

  while($rows = oci_fetch_assoc($consulta)){
    echo '<tr class="color'.$c.'" style="text-align:center !important; color:#000; font-style:normal;font-size:12px">'.
         '<td>'.$rows['DOCUMENTO_CR'].'</td>'.
         '<td>'.$rows['NUMERO_CR'].'</td>'.
         '<td>'.$rows['UBICACION_CR'].'</td>'.
         '<td>'.$rows['FACF_FECHA_CR'].'</td>'.
         '<td>'.$rows['FACV_TOTAL_PAGO'].'</td>'.
         '<td>'.$rows['FACF_FACTURA'].'</td>'.
         '<td>'.$rows['FACC_FACTURA'].'</td>'.
         '<td>'.$rows['FACN_CONTRATO_CAPITADO'].'</td></tr>';
         $i = $i + 1;
   }
   oci_close($c);


?>
