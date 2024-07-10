<?php
    session_start();
    $session = $_SESSION;

    unset($session['acc']);
    //unset($session['usu']);
    // print_r($session);
    // $ses = json_encode($_SESSION);
    $ses = json_encode($session);
    if($ses != "[]"){
        echo $ses;
    } else {
        echo true;
    }
?>
