<?php
require_once('../config/dbcon_prod.php');
require_once('PHPExcel/IOFactory.php');
//var_dump($_POST);

//echo $_FILES['excel']['type'];
  if(($_FILES['excel']['type']=='application/excel') || ($_FILES['excel']['type']=='application/vnd.ms-excel') ||
     ($_FILES['excel']['type']=='application/x-excel') || ($_FILES['excel']['type']=='application/x-msexcel') ||
     ($_FILES['excel']['type']=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {

    //var_dump($_POST);
    $numero        = $_POST['numero'];
		$fecha		     = date("Y-m-d");
		$carpeta 	     = "tmp_excel/";
    $insercion_det = 1;
		$excel  	     = $fecha."-".$_FILES['excel']['name'];
    $v_json_error  = "";
    $mensajeerror  = "";

		move_uploaded_file($_FILES['excel']['tmp_name'], "$carpeta$excel");

    // Cargo la hoja de c�lculo
  	$objPHPExcel = PHPExcel_IOFactory::load($carpeta.$excel);

  	//Asigno la hoja de calculo activa
  	$objPHPExcel->setActiveSheetIndex(0);
  	//Obtengo el numero de filas del archivo
  	$numRows = $objPHPExcel->setActiveSheetIndex(0)->getHighestRow();
    for ($i = 2; $i <= $numRows; $i++) {

      $renglon = $objPHPExcel->getSheet()->getCell('A'.$i)->getCalculatedValue();
      $cuenta = $objPHPExcel->getSheet()->getCell('B'.$i)->getCalculatedValue();
      $naturaleza = $objPHPExcel->getSheet()->getCell('C'.$i)->getCalculatedValue();
      $valor = $objPHPExcel->getSheet()->getCell('D'.$i)->getCalculatedValue();
      $tercero = $objPHPExcel->getSheet()->getCell('E'.$i)->getCalculatedValue();

      //echo $numero.'-'.$renglon.'-'.$cuenta.'-'.$naturaleza.'-'.$valor.'-'.$tercero.'<br>' ;

      if (strlen($valor) > 0){

        //$valor = str_replace($valor,',','.');
        $consulta = oci_parse($c,'begin PQ_GENESIS_KMOV.p_ins_kmvd(:v_pnumero,:v_prenglon,:v_pcuenta,:v_pnaturaleza,:v_pvalor,:v_ptercero, :v_json_row); end;');
        $clob = oci_new_descriptor($c,OCI_D_LOB);
        oci_bind_by_name($consulta,':v_pnumero',$numero);
        oci_bind_by_name($consulta,':v_prenglon',$renglon);
        oci_bind_by_name($consulta,':v_pcuenta',$cuenta);
        oci_bind_by_name($consulta,':v_pnaturaleza',$naturaleza);
        oci_bind_by_name($consulta,':v_pvalor',$valor);
        oci_bind_by_name($consulta,':v_ptercero',$tercero);
        oci_bind_by_name($consulta,':v_json_row', $clob,-1,OCI_B_CLOB);
    		oci_execute($consulta,OCI_DEFAULT);

        $json = $clob->read($clob->size());
        $noj = json_decode($json);
        if($noj->{'codigo'} == "0"){
             $insercion_det = $insercion_det + 1;
         }else{
           $v_json_error = $v_json_error . $noj->{'observacion_err'}.'<br>';
           $mensajeerror =  $noj->{'observacion_err'};
         }
      }
    }//for ($i = 2; $i <= $numRows; $i++) {
    if ($insercion_det == $numRows) {
      $arr = array('codigo' => 0, 'error' => 'Datos insertados correctamente');
      echo json_encode($arr);
    }else {
      $arr = array('codigo' => 1, 'error' => $mensajeerror);
      echo json_encode($arr);
    }
    // echo $v_json_error;
    oci_close($c);

}
?>
