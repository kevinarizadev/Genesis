<?php
  ini_set('session.gc_probability', 1);
  if(!isset($_SESSION))
  {
                 session_start();
  }
  if (isset($_SESSION['usu']) ){
                 $usu = 'cesar.nuñez';

  }else{
                 $usu = 'usuweb';
  }
  if (isset($_SESSION['acc']) ){
                 $acc = 'Cajacopi2022.';
  }else{
                 $acc = 'Cajacopi2022.';
  }

  //$c = oci_connect($usu,$acc, 'SVEPSORACLESCANL001.cajacopieps.local/OASIS','AL32UTF8');
  $c = oci_connect($usu,$acc, '192.168.50.14/OASISQA','AL32UTF8');
  //$c = oci_connect('OASIS', '_)$C4j4c0p1$(_', '192.168.50.14/OASIS','AL32UTF8');
  //$c = oci_connect($usu,$acc, $servidor,'AL32UTF8');
  if (!$c) {
      $e = oci_error();
      trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
  }
?>
