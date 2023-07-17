<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function Validar()
{
  require_once('../config/dbconsqlserver_softars.php');
  global $request;
  // $cod_area = $request->cod_area;
  $consulta = "SELECT count(1) count FROM CONTDOCENTREGAENTES WHERE PER_REPORTE=FORMAT(GETDATE(),'MM/yyyy');";
  // $consulta = "SELECT count(1) count FROM CONTDOCENTREGAENTES WHERE PER_REPORTE='02/2022';";
  $stmt = sqlsrv_query($conn, $consulta);
  $row = array();
  if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
  }
  // FORMAT(GETDATE(),'MM/yyyy')
  while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    // print_r($row);
    if ($row['count'] == 0) {
      $consulta = "INSERT INTO CONTDOCENTREGAENTES
        SELECT CODCTROCOSTOS, 
        COD_DOCENTREGA, 
        FORMAT(GETDATE(),'MM/yyyy'),  
        GETDATE(),
        OBS_DOCENTREGA,
        '',
        'sergio.lara',
        GETDATE(),
        NULL,
        CODCTROPRESTADOR,
        CONF_ORIGINAL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
        FROM CONTDOCENTREGAENTES WHERE PER_REPORTE='03/2022';";
      $stmt = sqlsrv_query($conn, $consulta);
      $rows_affected = sqlsrv_rows_affected($stmt);
      if ($stmt) {
        echo $rows_affected . " Registros guardados.\n";
      } else {
        echo "Error.\n";
        die(print_r(sqlsrv_errors(), true));
      }
    } else {
      echo $row['count']." Registros ya existentes.";
    }
  }

  // echo json_encode($rows, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
  sqlsrv_free_stmt($stmt);
  sqlsrv_close($conn);
}


// $consulta = "INSERT INTO CONTDOCENTREGAENTES
  // SELECT CODCTROCOSTOS, 
  //     COD_DOCENTREGA, 
  //     '12/2022',  
  //     GETDATE(),
  //     OBS_DOCENTREGA,
  //     '',
  //     'sergio.lara',
  //     GETDATE(),
  //     NULL,
  //     CODCTROPRESTADOR,
  //     CONF_ORIGINAL,
  //     NULL,
  //     NULL,
  //     NULL,
  //     NULL,
  //     NULL,
  //     NULL
  // FROM CONTDOCENTREGAENTES WHERE PER_REPORTE='01/2022' 
  // AND CODCTROCOSTOS = '00001'
  // AND COD_DOCENTREGA = '12';";
